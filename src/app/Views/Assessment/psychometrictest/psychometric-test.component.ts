import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { Question, Section, Section1 } from '../../../Models/Assessment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssessmentService } from '../../../Services/Assessment/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { EnumStatus } from '../../../Common/GlobalConstants';
import { async } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var window: any;


@Component({
  selector: 'app-psychometric-test',
  standalone: false,
  templateUrl: './psychometric-test.component.html',
  styleUrl: './psychometric-test.component.css'
})
export class PsychometricTestComponent implements OnInit {
  sSOLoginDataModel = new SSOLoginDataModel();
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  public State: number = 0;
  public Message: any = [];
  public ErrorMessage: any = [];
  UserName: any = '';
  public MultiHostelWardenRoleList: any = [];
  sections: Section1[] = [];
  sectionName: string = '';
  sectionCounter: number = 0;
  selectedSection: Section | null = null;
  newQuestion: Question[] = [];
  questionText: string = '';
  Option1: string = '';
  Option2: string = '';
  Option3: string = '';
  Option4: string = '';
  correctAnswerIndex: number | null = null;
  questionCounter: number = 0;
  questionsList: any[] = [];
  selectedSectionId: number = 0; 
  public LevelType: number = 0; 
  public PsychometricCategoryList: any = [];
  public SelectAssessmentQuestions: boolean = false;
  public AddQuestionList: boolean = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  public PsychometricQuestionList: any = [];
  SelectId: number | null = null;
  editingIndex: number | null = null;
  constructor(private router: Router, private loaderService: LoaderService, private AssessmentService: AssessmentService, private toastr: ToastrService, private modalService: NgbModal,) {
  }


  async ngOnInit() {

    this.sSOLoginDataModel = await JSON.parse(String(localStorage.getItem('SSOLoginUser')));
    this.GetPsychometricCategoryList();
  }
   async addSection() {
    if (!this.sectionName.trim()) return;
    this.sectionCounter++;
    this.sections.push({
      Id: this.sectionCounter,
      Name: this.sectionName,
      UserID: this.sSOLoginDataModel.UserID,
      questions :0
    });
    console.log(this.sections, 'Section');
    this.sectionName = '';
  }

  deleteSection(id: number) {
    this.sections = this.sections.filter(sec => sec.Id !== id);
    if (this.selectedSection?.Id === id) {
      this.selectedSection = null;
    }
  }

  openSection(section: Section) {
    this.selectedSection = section;
    console.log(this.selectedSection, 'Seleted');
    this.SelectAssessmentQuestions = true;
    this.GetPsychometricQuestionList(section);
  }

  async addQuestion() {
    if (!this.questionText.trim()) return;

    // Build array from individual options
    //const options = [this.Option1, this.Option2, this.Option3, this.Option4]
    //  .map(opt => opt.trim())
    //  .filter(opt => opt !== '');

    // Determine correct option value
    //const optionValues = [this.Option1, this.Option2, this.Option3, this.Option4];
    //const CorrectValue = this.correctAnswerIndex !== null? optionValues[this.correctAnswerIndex]?.trim() || null: null;

    // Create question object with correct answer included
    const newQuestion = {
      id: this.questionsList.length + 1,
      text: this.questionText.trim(),
      Level: this.LevelType
      //options: options,
      //correctAnswerIndex: this.correctAnswerIndex,
      //CorrectValue: CorrectValue
    };

    // Add to list
    this.questionsList.push(newQuestion);

    // Reset form
    this.questionText = '';
    //this.Option1 = '';
    //this.Option2 = '';
    //this.Option3 = '';
    //this.Option4 = '';
    //this.correctAnswerIndex = 0;

    console.log(this.questionsList);
  }

  async SavePsychometricCategory() {
    debugger;
    await this.addSection();
    if (this.sections.length == 0) {
      this.toastr.error('Enter Psychometric Category Name');
      return;
    }
    try {
      const saveDataResponse: any = await this.AssessmentService.SavePsychometricCategory(this.sections);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];

      if (this.State == EnumStatus.Success) {
        this.sections = [];
        await this.GetPsychometricCategoryList();
      } else {
        this.toastr.error(this.ErrorMessage);
      }
    }
    catch (ex) {

    };
  }
  async GetPsychometricCategoryList() {
      debugger;
      var UserId = this.sSOLoginDataModel.UserID;
      try {
        const saveDataResponse: any = await this.AssessmentService.GetPsychometricCategoryList(UserId);
        this.State = saveDataResponse['State'];
        this.Message = saveDataResponse['Message'];
        this.ErrorMessage = saveDataResponse['ErrorMessage'];

        if (this.State == EnumStatus.Success) {
          this.PsychometricCategoryList = saveDataResponse.Data;
          //this.selectedSection = this.AssessmentList.Name;
          // Update front-end state
          this.State = saveDataResponse.State;
          this.Message = saveDataResponse.Message;
          this.ErrorMessage = saveDataResponse.ErrorMessage;
          if (this.State === EnumStatus.Success) {
            this.toastr.success(this.Message);
          } else {
            this.toastr.error(this.ErrorMessage || 'Something went wrong');
          }
          console.log(saveDataResponse);
        } else {
          this.toastr.error(this.ErrorMessage);
        }
      }
      catch (ex) {

      };
  }
  async SavePsychometricQuestion() {
    await this.addQuestion();
    try {
      const mergedData = this.questionsList.map(q => ({
        ...q,
        SectionId: this.selectedSection?.Id ?? null,
        SectionName: this.selectedSection?.Name ?? null,
        UserId: this.sSOLoginDataModel.UserID
      }));
      this.SelectId = this.selectedSection?.Id ?? null;
      console.log(mergedData, 'Question Payload');
      const saveDataResponse: any = await this.AssessmentService.SavePsychometricQuestion(mergedData);

      // Update front-end state
      this.State = saveDataResponse.State;
      this.Message = saveDataResponse.Message;
      this.ErrorMessage = saveDataResponse.ErrorMessage;

      if (this.State === EnumStatus.Success) {
        this.sections = [];
        this.questionsList = [];
        this.LevelType = 0;
        this.toastr.success('All Question Save Successfully');
        await this.GetPsychometricCategoryList();
        await this.GetPsychometricQuestionList(this.SelectId)
       // await this.GetAssessmentQuestionCount();
      } else {
        this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
    } catch (ex) {
      console.error('SaveAssessmentQuestion error:', ex);
      this.toastr.error('Error saving questions.');
    }
  }
  //async GetAssessmentQuestionCount() {
  //  debugger;
  //  var UserId = this.sSOLoginDataModel.UserID;
  //  try {
  //    const saveDataResponse: any = await this.AssessmentService.GetAssessmentQuestionCount(UserId);
  //    this.State = saveDataResponse['State'];
  //    this.Message = saveDataResponse['Message'];
  //    this.ErrorMessage = saveDataResponse['ErrorMessage'];

  //    if (this.State == EnumStatus.Success) {
  //      this.AssessmentList = saveDataResponse.Data;
  //      //this.selectedSection = this.AssessmentList.Name;
  //      // Update front-end state
  //      this.State = saveDataResponse.State;
  //      this.Message = saveDataResponse.Message;
  //      this.ErrorMessage = saveDataResponse.ErrorMessage;
  //      if (this.State === EnumStatus.Success) {
  //      } else {
  //        this.toastr.error(this.ErrorMessage || 'Something went wrong');
  //      }
  //      console.log(saveDataResponse);
  //    } else {
  //      this.toastr.error(this.ErrorMessage);
  //    }
  //  }
  //  catch (ex) {

  //  };
  //}

  async openDeleteModal(section: any): Promise<boolean> {
    this.selectedSectionId = section.Id; // save the selected ID

    return new Promise((resolve) => {
      this.modalService.open(this.modalTemplate, {
        size: 'mb',
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static'
      }).result.then(
        (result: any) => {
          resolve(result === 'ok'); // true if OK, false otherwise
        },
        () => {
          resolve(false); // dismissed
        }
      );
    });
  }
  confirmNextStep(modal: any, action: string) {
    if (action === 'ok') {
      modal.close('ok');
    } else {
      modal.dismiss('cancel');
    }
  }
  async DeleteAssessment(sectionId: number) {
    debugger;
    var UserId = this.sSOLoginDataModel.UserID;
    var SelectSectionId = sectionId;
    try {
      const saveDataResponse: any = await this.AssessmentService.DeleteAssessment(UserId,SelectSectionId);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];

      if (this.State == EnumStatus.Success) {
        this.toastr.success(this.Message);
        await this.GetPsychometricCategoryList();
      } else {
        this.toastr.error(this.ErrorMessage);
      }
    }
    catch (ex) {

    };
  }
  addQuestionList() {
    this.AddQuestionList = true;
    this.questionText = '';
    this.Option1 = '';
    this.Option2 = '';
    this.Option3 = '';
    this.Option4 = '';

    // Try to find the correct answer index based on CorrectValue
    this.correctAnswerIndex = null;
  }
  sortData(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.questionsList.sort((a: any, b: any) => {
      let valA = a[column] ? a[column].toString().toLowerCase() : '';
      let valB = b[column] ? b[column].toString().toLowerCase() : '';
      if (valA < valB) return this.sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return this.sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }
  async GetPsychometricQuestionList(section: any) {
    debugger;
    var UserId = this.sSOLoginDataModel.UserID;
    var SelectId = section.Id || section;
    //console.log(SelectId);
    try {
      const saveDataResponse: any = await this.AssessmentService.GetPsychometricQuestionList(UserId, SelectId);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];

      if (this.State == EnumStatus.Success) {
        this.PsychometricQuestionList = saveDataResponse.Data;
        //this.selectedSection = this.AssessmentList.Name;
        // Update front-end state
        this.State = saveDataResponse.State;
        this.Message = saveDataResponse.Message;
        this.ErrorMessage = saveDataResponse.ErrorMessage;
        if (this.State === EnumStatus.Success) {

        } else {
          this.toastr.error(this.ErrorMessage || 'Something went wrong');
        }
        console.log(saveDataResponse);
      } else {
        this.toastr.error(this.ErrorMessage);
      }
    }
    catch (ex) {

    };
  }
  EditQuestion(q: any, index: number) {
    debugger;
    this.editingIndex = index;

    // If options come as comma-separated string, split it
    const opts = q.opt.split(',').map((x: string) => x.trim());

    this.questionText = q.text;
    this.Option1 = opts[0] || '';
    this.Option2 = opts[1] || '';
    this.Option3 = opts[2] || '';
    this.Option4 = opts[3] || '';

    // Try to find the correct answer index based on CorrectValue
    this.correctAnswerIndex = opts.indexOf(q.CorrectValue?.trim());
    this.AddQuestionList = true;
  }
}

