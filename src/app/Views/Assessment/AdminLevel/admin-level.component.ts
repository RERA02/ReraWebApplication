import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { Question, Section } from '../../../Models/Assessment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssessmentService } from '../../../Services/Assessment/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { AssessmentType, EnumStatus } from '../../../Common/GlobalConstants';
import { async } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonFunctionService } from '../../../Services/CommonFunction/common-function.service';
import { UploadFileModel } from '../../../Models/UploadFileModel';
declare var window: any;


@Component({
  selector: 'app-admin-level',
  standalone: false,
  templateUrl: './admin-level.component.html',
  styleUrl: './admin-level.component.css'
})
export class AssessmentComponent implements OnInit {
  sSOLoginDataModel = new SSOLoginDataModel();
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  @ViewChild('DeleteQuestionModel') DeleteQuestionModel!: TemplateRef<any>;
  public State: number = 0;
  public Message: any = [];
  public ErrorMessage: any = [];
  UserName: any = '';
  public MultiHostelWardenRoleList: any = [];
  sections: Section[] = [];
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
  public AssessmentList: any = [];
  public SelectAssessmentQuestions: boolean = false;
  public TextTypeAddQuestionList: boolean = false;
  public ImageAddQuestionList: boolean = false;
  public AddQuestionList: boolean = false;
  sortColumn: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  public AssessmentQuestionList: any = [];
  SelectId: number | null = null;
  editingIndex: number | null = null;
  TextType: string = '';
  QuestionImage: string = '';
  option1Image: string = '';
  option2Image: string = '';
  option3Image: string = '';
  option4Image: string = '';
  QuestionlistImage: any[] = [];
  questionTextimage: string = '';
  Option1textimage: string = '';
  Option2textimage: string = '';
  Option3textimage: string = '';
  Option4textimage: string = '';
  correctAnswerIndeximage: number | null = null;
  MinQuestions: number = 0;
  DurationMinutes: number = 0;
  IsMandatory: boolean = false;
  AssessmentTypeId: number = AssessmentType.Self;
  AssessmentType = AssessmentType;
  psychometricQuestionText: string = '';

psychometricOptions = [
  { text: 'Strongly Agree', marks: 20, OptionOredr:5 },
  { text: 'Agree', marks: 20,OptionOredr:4 },
  { text: 'Neutral', marks: 20,OptionOredr:3 },
  { text: 'Disagree', marks: 20,OptionOredr:2 },
  { text: 'Strongly Disagree', marks: 20,OptionOredr:1 }
];
psychometricQuestionSense: number = 1; // 1 = Positive, -1 = Negative

  // FILE OBJECTS (for upload at save time)
QuestionImageFile: File | null = null;
option1ImageFile: File | null = null;
option2ImageFile: File | null = null;
option3ImageFile: File | null = null;
option4ImageFile: File | null = null;

// PREVIEW URLS (ONLY for UI)
QuestionImagePreview: string | null = null;
option1ImagePreview: string | null = null;
option2ImagePreview: string | null = null;
option3ImagePreview: string | null = null;
option4ImagePreview: string | null = null;

  isEditMode: boolean = false;
  editSectionId: number | null = null;
  constructor(private router: Router, private loaderService: LoaderService, private AssessmentService: AssessmentService, private toastr: ToastrService, private modalService: NgbModal,
    private commonMasterService: CommonFunctionService) {
  }


  async ngOnInit() {

    this.sSOLoginDataModel = await JSON.parse(String(localStorage.getItem('SSOLoginUser')));
    this.GetAssessmentList();
  }
  //  async addSection() {
  //   if (!this.sectionName.trim()) return;
  //   this.sectionCounter++;
  //   this.sections.push({
  //     Id: this.sectionCounter,
  //     Name: this.sectionName,
  //     UserID: this.sSOLoginDataModel.UserID,
  //     questions :0
  //   });
  //   console.log(this.sections, 'Section');
  //   this.sectionName = '';
  // }

  async addSection() {
  if (!this.sectionName.trim()) return;

  this.sections = [{
    Id: this.editSectionId ?? 0,
    Name: this.sectionName,
    UserID: this.sSOLoginDataModel.UserID,
    questions: 0,
    MinQuestions: this.MinQuestions,
    DurationMinutes: this.DurationMinutes,
    IsMandatory: this.IsMandatory,
     AssessmentTypeId: this.AssessmentTypeId // 👈 IMPORTANT
  }];

  // reset form
  this.sectionName = '';
  this.MinQuestions = 0;
  this.DurationMinutes = 0;
  this.IsMandatory = false;
  this.isEditMode = false;
  this.editSectionId = null;
  this.AssessmentTypeId = AssessmentType.Self;
}

editSection(section: any) {
  this.isEditMode = true;
  this.editSectionId = section.Id;

  this.sectionName = section.Name;
  this.MinQuestions = section.MinQuestions || 0;
  this.DurationMinutes = section.DurationMinutes || 0;
  this.IsMandatory = section.IsMandatory || false;
  this.AssessmentTypeId = section.AssessmentTypeId;
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
    this.GetQuestionList(section);
  }

  async addQuestion() {
    if (!this.questionText.trim()) return;

    // Build array from individual options
    const options = [this.Option1, this.Option2, this.Option3, this.Option4]
      .map(opt => opt.trim())
      .filter(opt => opt !== '');

    // Determine correct option value
    const optionValues = [this.Option1, this.Option2, this.Option3, this.Option4];
    const CorrectValue = this.correctAnswerIndex !== null? optionValues[this.correctAnswerIndex]?.trim() || null: null;

    // Create question object with correct answer included
    const newQuestion = {
      id: this.questionsList.length + 1,
      text: this.questionText.trim(),
      options: options,
      correctAnswerIndex: this.correctAnswerIndex,
      CorrectValue: CorrectValue
    };

    // Add to list
    this.questionsList.push(newQuestion);

    // Reset form
    this.questionText = '';
    this.Option1 = '';
    this.Option2 = '';
    this.Option3 = '';
    this.Option4 = '';
    this.correctAnswerIndex = 0;

    console.log(this.questionsList);
  }

 async SavePsychometricQuestion() {
  if (!this.psychometricQuestionText.trim()) return;
  const clonedOptions = this.psychometricOptions.map(o => ({
    text: o.text,
    marks: o.marks,
    OptionOrder:o.OptionOredr
  }));

  const newQuestion = {
    id: this.questionsList.length + 1,
    text: this.psychometricQuestionText.trim(),
    QuestionSense: this.psychometricQuestionSense,
    options: clonedOptions,
    AssessmentTypeId: 2
  };
  this.questionsList.push(newQuestion);

  // reset
  this.psychometricQuestionText = '';
  this.psychometricOptions.forEach(o => o.marks = 20);

  console.log(this.questionsList);
}

  async SaveAssessment() {
    debugger;
    await this.addSection();
    if (this.sections.length == 0) {
      this.toastr.error('Enter Section Name');
      return;
    }

    try {
      const saveDataResponse: any = await this.AssessmentService.SaveAssessment(this.sections);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];

      if (this.State == EnumStatus.Success) {
        this.sections = [];
        await this.GetAssessmentList();
      } else {
        this.toastr.error(this.ErrorMessage);
      }
    }
    catch (ex) {

    };
  }
  async GetAssessmentList() {
      debugger;
      var UserId = this.sSOLoginDataModel.UserID;
      try {
        const saveDataResponse: any = await this.AssessmentService.GetAssessmentList(UserId);
        this.State = saveDataResponse['State'];
        this.Message = saveDataResponse['Message'];
        this.ErrorMessage = saveDataResponse['ErrorMessage'];

        if (this.State == EnumStatus.Success) {
          this.AssessmentList = saveDataResponse.Data;
          //this.selectedSection = this.AssessmentList.Name;
          // Update front-end state
          this.State = saveDataResponse.State;
          this.Message = saveDataResponse.Message;
          this.ErrorMessage = saveDataResponse.ErrorMessage;
          if (this.State === EnumStatus.Success) {
            
          }
          else if (this.State === EnumStatus.Warning) {
            this.toastr.error(this.Message);
          }
          else {
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
  async SaveAssessmentQuestion() {

      // Question
  if (this.isEmpty(this.questionText)) {
    this.toastr.error('Question is required');
    return;
  }

  // Options
  if (
    this.isEmpty(this.Option1) ||
    this.isEmpty(this.Option2) ||
    this.isEmpty(this.Option3) ||
    this.isEmpty(this.Option4)
  ) {
    this.toastr.error('All options are required');
    return;
  }

  // Correct answer
  if (this.correctAnswerIndex === null) {
    this.toastr.error('Please select the correct option');
    return;
  }
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
      const saveDataResponse: any = await this.AssessmentService.SaveAssessmentQuestion(mergedData);

      // Update front-end state
      this.State = saveDataResponse.State;
      this.Message = saveDataResponse.Message;
      this.ErrorMessage = saveDataResponse.ErrorMessage;

      if (this.State === EnumStatus.Success) {
        this.sections = [];
        this.questionsList = [];
        this.toastr.success('All Question Save Successfully');
        await this.GetAssessmentList();
        await this.GetQuestionList(this.SelectId)
       // await this.GetAssessmentQuestionCount();
      } else {
        this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
    } catch (ex) {
      console.error('SaveAssessmentQuestion error:', ex);
      this.toastr.error('Error saving questions.');
    }
  }

  async SaveAssessmentPsychometricQuestion2() {

    
  // Question text
  if (this.isEmpty(this.psychometricQuestionText)) {
    this.toastr.error('Question is required');
    return;
  }

  // Question sense (Positive / Negative)
  if (this.psychometricQuestionSense !== 1 &&
      this.psychometricQuestionSense !== -1) {
    this.toastr.error('Please select question sense');
    return;
  }

  // Marks validation
  const invalidMarks = this.psychometricOptions.some(
    o => o.marks === null || o.marks === undefined
  );

  if (invalidMarks) {
    this.toastr.error('Marks are required for all options');
    return;
  }
       await this.SavePsychometricQuestion();

    try {
      debugger
      const mergedData = this.questionsList.map(q => ({
        ...q,
        SectionId: this.selectedSection?.Id ?? null,
        SectionName: this.selectedSection?.Name ?? null,
        UserId: this.sSOLoginDataModel.UserID
      }));
      this.SelectId = this.selectedSection?.Id ?? null;
      console.log(mergedData, 'Question Payload');
      debugger
      const saveDataResponse: any = await this.AssessmentService.SaveAssessmentPsychometricQuestion2(mergedData);

      // Update front-end state
      this.State = saveDataResponse.State;
      this.Message = saveDataResponse.Message;
      this.ErrorMessage = saveDataResponse.ErrorMessage;

      if (this.State === EnumStatus.Success) {
        this.sections = [];
        this.questionsList = [];
        this.toastr.success('All Question Save Successfully');
        await this.GetAssessmentList();
        await this.GetQuestionList(this.SelectId)
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
        await this.GetAssessmentList();
      } else {
        this.toastr.error(this.ErrorMessage);
      }
    }
    catch (ex) {

    };
  }

  getAssessmentTypeName(typeId: number): string {
  switch (typeId) {
    case AssessmentType.Self:
      return 'Self Assessment';
    case AssessmentType.Psychometric:
      return 'Psychometric';
    default:
      return 'Unknown';
  }
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
  async GetQuestionList(section: any) {
    var UserId = this.sSOLoginDataModel.UserID;
    var SelectId = section.Id || section;
    //console.log(SelectId);
    try {
      const saveDataResponse: any = await this.AssessmentService.GetQuestionList(UserId, SelectId);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];
      debugger;
      if (this.State === EnumStatus.Success) {
          this.AssessmentQuestionList = saveDataResponse.Data;
      }
      else if (this.State === EnumStatus.Warning) {
        this.toastr.error(this.Message);
        this.AssessmentQuestionList = '';
      }
      else {
          this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
      console.log(saveDataResponse);
     
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
  TypeCategory() {
    debugger;
    if (this.TextType == '1') {
      this.TextTypeAddQuestionList = true;
      this.ImageAddQuestionList = false;
    }
    else {
      this.TextTypeAddQuestionList = false;
      this.ImageAddQuestionList = true;
    }
  }
  file: any;
  // async onFilechange(event: any, Type: string) {
  //   debugger;
  //   try {
  //     // this.OTRFormGroup.FolderName = ''
  //     this.file = event.target.files[0];
  //     if (this.file) {

  //       //if (['application/jpeg'].includes(this.file.type) && ['application/png'].includes(this.file.type)) {
  //       //  // Size validation in bytes (100 KB = 100 * 1024)
  //       //  if (this.file.size > 100 * 1024) {
  //       //    this.toastr.error('Select a file less than 100KB');
  //       //    return;
  //       //  }
  //       //} else {
  //       //  this.toastr.error('Select only image files (jpg, jpeg, png, gif)');
  //       //  return;
  //       //}
  //       // Type validation
  //       //if (['application/pdf'].includes(this.file.type)) {
  //       //  // Size validation
  //       //  if (this.file.size > 100) {
  //       //    this.toastr.error('Select less than 100KB File');
  //       //    return;
  //       //  }
  //       //}
  //       //else {
  //       //  this.toastr.error('Select Only pdf file');
  //       //  return;
  //       //}
  //       let uploadModel = new UploadFileModel();
  //       uploadModel.FileExtention = this.file.type ?? "";
  //       uploadModel.MinFileSize = "";
  //       uploadModel.MaxFileSize = "100";
  //       uploadModel.FolderName = "Assessment/Image/Question";
  //       // Upload to server folder
  //       await this.commonMasterService.UploadDocument(this.file, uploadModel)
  //         .then((data: any) => {
  //           data = JSON.parse(JSON.stringify(data));
  //           debugger;
  //           console.log("File data", data);
  //           if (data.State === EnumStatus.Success) {
  //             const fileName = data['Data'][0]["Dis_FileName"];
  //             const actualFile = data['Data'][0]["FileName"];

  //             if (Type == 'Question') {
  //               this.QuestionImage = actualFile;
  //             }
  //             else if (Type == 'Option1') {
  //               this.option1Image = actualFile;
  //             }
  //             else if (Type == 'Option2') {
  //               this.option2Image = actualFile;
  //             }
  //             else if (Type == 'Option3') {
  //               this.option3Image = actualFile;
  //             }
  //             else {
  //               this.option4Image = actualFile;
  //             }
  //           }
  //           //event.target.value = null;
  //           if (data.State === EnumStatus.Error) {
  //             this.toastr.error(data.ErrorMessage);

  //           } else if (data.State === EnumStatus.Warning) {
  //             this.toastr.warning(data.ErrorMessage);
  //           }
  //         });
  //     }
  //   } catch (Ex) {
  //     console.log(Ex);
  //   } finally {
  //     this.loaderService.requestEnded();
  //   }
  // }

  onFilechange(event: any, type: string) {
  const file = event.target.files[0];
  if (!file) return;

  const previewUrl = URL.createObjectURL(file);

  switch (type) {
    case 'Question':
      this.QuestionImageFile = file;
      this.QuestionImagePreview = previewUrl;
      break;

    case 'Option1':
      this.option1ImageFile = file;
      this.option1ImagePreview = previewUrl;
      break;

    case 'Option2':
      this.option2ImageFile = file;
      this.option2ImagePreview = previewUrl;
      break;

    case 'Option3':
      this.option3ImageFile = file;
      this.option3ImagePreview = previewUrl;
      break;

    case 'Option4':
      this.option4ImageFile = file;
      this.option4ImagePreview = previewUrl;
      break;
  }
}

async uploadImage(file: File): Promise<string> {
  let uploadModel = new UploadFileModel();
  uploadModel.FolderName = "Assessment/Image/Question";

  const res: any = await this.commonMasterService.UploadDocument(file, uploadModel);
  return res.Data[0].FileName; // ← DB path
}

 removeOptionImage(type: string) {
    switch (type) {
      case 'Option1':
        this.option1ImageFile = null;
        this.option1ImagePreview = null;
        this.option1Image = '';
        break;

      case 'Option2':
        this.option2ImageFile = null;
        this.option2ImagePreview = null;
        this.option2Image = '';
        break;

      case 'Option3':
        this.option3ImageFile = null;
        this.option3ImagePreview = null;
        this.option3Image = '';
        break;

      case 'Option4':
        this.option4ImageFile = null;
        this.option4ImagePreview = null;
        this.option4Image = '';
        break;
    }
  }
  async DeleteQuestion(q: any, index: number) {
    const modalRef = this.modalService.open(this.DeleteQuestionModel, {
      size: 'mb',
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
      centered: true
    });
    try {
      const result = await modalRef.result; // waits for user action
      if (result !== 'ok') return;
      const questionId = q.Id;
      const UserId = this.sSOLoginDataModel.UserID;

      const saveDataResponse: any = await this.AssessmentService.DeleteQuestion(UserId, questionId);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];
      debugger;
      if (this.State === EnumStatus.Success) {
        // this.toastr.success('Successfully Delete Question');
        this.toastr.success('Question deactivated successfully');

        this.GetQuestionList(this.selectedSection);
      }
      else if (this.State === EnumStatus.Warning) {

      }
      else {
        this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
      console.log(saveDataResponse);

    }
    catch (ex) {

    };
    
  }
  // async addQuestionimage() {
  //   debugger;

  //   // Create a single structured object
  //   const newQuestion = {
  //     id:this.QuestionlistImage.length+1,
  //     SectionId: this.selectedSection?.Id ?? null,
  //     SectionName: this.selectedSection?.Name ?? null,
  //     UserId: this.sSOLoginDataModel.UserID,
  //     QuestionText: this.questionTextimage,
  //     QuestionImage: this.QuestionImage,
  //     Options: [
  //       { text: this.Option1textimage, image: this.option1Image },
  //       { text: this.Option2textimage, image: this.option2Image },
  //       { text: this.Option3textimage, image: this.option3Image },
  //       { text: this.Option4textimage, image: this.option4Image }
  //     ],
  //     CorrectAnswerIndex: this.correctAnswerIndeximage
  //   };

  //   // Push it to your question list
  //   this.QuestionlistImage = [...(this.QuestionlistImage || []), newQuestion];

  //   console.log('🧠 Question Added:', newQuestion);
  //   console.log('📋 Full Question List:', this.QuestionlistImage);

  //   // Optionally reset fields after adding
  //   this.questionTextimage = '';
  //   this.QuestionImage = '';
  //   this.Option2textimage = this.Option1textimage = this.Option3textimage = this.Option4textimage = '';
  //   this.option1Image = this.option2Image = this.option3Image = this.option4Image = '';
  //   this.correctAnswerIndeximage = null;

  //   // Optional toast message
  //   this.toastr.success('Question added successfully ✨');
  // }

  async addQuestionimage() {

  // Upload images ONLY now
  if (this.QuestionImageFile)
    this.QuestionImage = await this.uploadImage(this.QuestionImageFile);

  if (this.option1ImageFile)
    this.option1Image = await this.uploadImage(this.option1ImageFile);

  if (this.option2ImageFile)
    this.option2Image = await this.uploadImage(this.option2ImageFile);

  if (this.option3ImageFile)
    this.option3Image = await this.uploadImage(this.option3ImageFile);

  if (this.option4ImageFile)
    this.option4Image = await this.uploadImage(this.option4ImageFile);

  // SAME PAYLOAD AS BEFORE (DB SAFE)
  const newQuestion = {
    SectionId: this.selectedSection?.Id,
    UserId: this.sSOLoginDataModel.UserID,
    QuestionText: this.questionTextimage,
    QuestionImage: this.QuestionImage,
    Options: [
      { text: this.Option1textimage, image: this.option1Image },
      { text: this.Option2textimage, image: this.option2Image },
      { text: this.Option3textimage, image: this.option3Image },
      { text: this.Option4textimage, image: this.option4Image }
    ],
    CorrectAnswerIndex: this.correctAnswerIndeximage
  };

  this.QuestionlistImage.push(newQuestion);

  // Optional toast message
     this.toastr.success('Question added successfully ✨');
}

  async SaveAssessmentQuestionImage() {
     // Question text
  if (this.isEmpty(this.questionTextimage)) {
    this.toastr.error('Question text is required');
    return;
  }

  // Question image
  // if (!this.QuestionImagePreview) {
  //   this.toastr.error('Question image is required');
  //   return;
  // }

  // Options text
  if (
    this.isEmpty(this.Option1textimage) ||
    this.isEmpty(this.Option2textimage) ||
    this.isEmpty(this.Option3textimage) ||
    this.isEmpty(this.Option4textimage)
  ) {
    this.toastr.error('All option texts are required');
    return;
  }

  // Options images
  // if (
  //   !this.option1ImagePreview ||
  //   !this.option2ImagePreview ||
  //   !this.option3ImagePreview ||
  //   !this.option4ImagePreview
  // ) {
  //   this.toastr.error('All option images are required');
  //   return;
  // }

  // Correct answer
  if (this.correctAnswerIndeximage === null) {
    this.toastr.error('Please select the correct option');
    return;
  }
    await this.addQuestionimage();
    try {

      const saveDataResponse: any = await this.AssessmentService.SaveAssessmentQuestionImage(this.QuestionlistImage);

      // Update front-end state
      this.State = saveDataResponse.State;
      this.Message = saveDataResponse.Message;
      this.ErrorMessage = saveDataResponse.ErrorMessage;

      if (this.State === EnumStatus.Success) {
        this.sections = [];
        this.questionsList = [];
        this.toastr.success('All Question Save Successfully');
        await this.GetAssessmentList();
        await this.GetQuestionList(this.SelectId)
        // await this.GetAssessmentQuestionCount();
      } else {
        this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
    } catch (ex) {
      console.error('SaveAssessmentQuestion error:', ex);
      this.toastr.error('Error saving questions.');
    }
  }

  private isEmpty(value: any): boolean {
  return value === null || value === undefined || value.toString().trim() === '';
}
}

