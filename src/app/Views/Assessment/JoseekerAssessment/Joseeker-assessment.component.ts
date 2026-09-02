import { Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../../Services/Loader/loader.service';
import { SSOLoginDataModel } from '../../../Models/SSOLoginDataModel';
import { Question, Section } from '../../../Models/Assessment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AssessmentService } from '../../../Services/Assessment/assessment.service';
import { ToastrService } from 'ngx-toastr';
import { EnumStatus } from '../../../Common/GlobalConstants';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var window: any;


@Component({
  selector: 'app-Joseeker-assessment',
  standalone: false,
  templateUrl: './Joseeker-assessment.component.html',
  styleUrl: './Joseeker-assessment.component.css'
})
export class JoseekerAssessmentComponent implements OnDestroy {

  sSOLoginDataModel = new SSOLoginDataModel();
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;
  @ViewChild('startTestConfirm', { static: true })
startTestConfirm!: TemplateRef<any>;
@ViewChild('reviewPopup') reviewPopup!: TemplateRef<any>;

minCategoriesRequired: number = 1;
maxAttempts: number = 0;
reattemptAfterDays: number = 0;
  public State: number = 0;
  public Message: any = [];
  public ErrorMessage: any = [];
  public categories: any = [];
  UserName: any = '';
  StartAssessmenttab: boolean = false;
  Welcomepage: boolean = true;
  StartTesttab: boolean = false;
  minutes: number = 15;
  seconds: number = 0;
  private timer: any;
  totalTimeMinutes: number = 0;
  remainingSeconds: number = 0;
  private timerRef: any;
  private targetTime!: number;
  // selectedCategory: any[] = [];
  selectedCategory: any = null;
  selectedCategories: any[] = [];
  QuestionList: any = [];
  currentIndex = 0; // show the first question initially
  currentQuestion: any;
  scoreList: any[] = [];
  selfAssessmentScores: any[] = [];
psychometricScores: any[] = [];
showScorePopup = false;
attemptStatus: any = null;
isAttemptAllowed: boolean = true;
attemptMessage: string = '';
userId = 6995; // example
  // options: string[] = [];
  // optionId: string[] = [];
  options: {
  optionId: number;
  optionText: string;
}[] = [];
  // answers: { [key: number]: string } = {};
  // answeredList: { Id: number; Answer: string }[] = [];
  selectedIndex: number | null = null;
  showCountdown = false;
  countdownValue = 3;
  imageBaseUrl:string = 'http://localhost:4200/StaticFiles/Assessment/Image/Question/';
  categoryAnswers: {
  [categoryId: number]: { [questionId: number]: number }
} = {};
  constructor(private router: Router, private loaderService: LoaderService, private AssessmentService: AssessmentService, private toastr: ToastrService, private modalService: NgbModal, private fb: FormBuilder) {
  }
  ngOnDestroy(): void {
    this.clearTimer();
  }

  // loadQuestion(index: number) {
  //   this.currentQuestion = this.QuestionList[index];
  //   this.options = this.currentQuestion.opt.split(',').map((x: string) => x.trim());
  //   this.optionId = this.currentQuestion.optId.split(',').map((x: string) => x.trim());

  // }

  loadQuestion(index: number) {
  this.currentQuestion = this.QuestionList[index];

  const optionTexts = this.currentQuestion.opt
    .split(',')
    .map((x: string) => x.trim());

  const optionImage = this.currentQuestion.optImage
    .split(',')
    .map((x: string) => x.trim());  

  const optionIds = this.currentQuestion.optId
    .split(',')
    .map((x: string) => Number(x.trim()));

  // Merge text + id safely
  this.options = optionTexts.map((text: string, i: number) => ({
    optionId: optionIds[i],
    optionText: text,
    optionImage:optionImage[i]
  }));
}

  async ngOnInit() {
    this.sSOLoginDataModel = await JSON.parse(String(localStorage.getItem('SSOLoginUser')));
    
  // 🔥 STEP 1: check attempt FIRST
  await this.checkUserAttemptStatus();

  // ❌ If not allowed → stop everything
  if (!this.isAttemptAllowed) {
    return;
  }

  // ✅ Only if allowed
    await this.loadAssessmentRule();
    this.GetAssesmentcategories();
    this.clearTimer();
  }
  // StartAssessment() {
  //   this.StartAssessmenttab = true;
  //   this.Welcomepage = false;
  //   this.StartTesttab = false;
  //   // this.restartTimer();
  // }


  async checkUserAttemptStatus() {
  try {
    const res: any =
      await this.AssessmentService.GetUserAttemptStatus(
        this.sSOLoginDataModel.UserID
      );

    if (res.State === EnumStatus.Success && res.Data?.length > 0) {
      const status = res.Data[0];
      this.attemptStatus = status;

      if (status.CanAttempt === 0) {
        this.isAttemptAllowed = false;

        // 🔥 USER FRIENDLY MESSAGE
        if (status.RemainingDays > 0) {
          this.attemptMessage =
            `You can attempt this assessment after ${status.RemainingDays} day(s).`;
        } else {
          this.attemptMessage =
            'You have reached the maximum number of attempts.';
        }

        this.toastr.warning(this.attemptMessage);
      }
    }
  } catch (err) {
    console.error(err);
    this.toastr.error('Unable to verify attempt status');
  }
}

  async loadAssessmentRule() {
  try {
    const res: any = await this.AssessmentService.GetActiveAssessmentRule();

    if (res.State === EnumStatus.Success && res.Data?.length > 0) {
      const rule = res.Data[0];

      this.minCategoriesRequired = rule.MinCategories;
      this.maxAttempts = rule.MaxAttempts;
      this.reattemptAfterDays = rule.ReattemptAfterDays;
    }
  } catch (ex) {
    console.error('Error loading assessment rule', ex);
  }
}

getAssessmentTypeIdBySection(sectionId: number): number | null {
  const category = this.categories.find((c: any) => c.Id === sectionId);
  return category ? category.AssessmentTypeId : null;
}

StartAssessment() {
   if (!this.isAttemptAllowed) {
    this.toastr.warning(this.attemptMessage);
    return;
  }

  this.clearTimer();
  this.StartAssessmenttab = true;
  this.Welcomepage = false;
  this.StartTesttab = false;
}
  BackAssessment() {
    this.StartAssessmenttab = false;
    this.Welcomepage = true;
  }
  // Starttest() {

  //   this.StartAssessmenttab = false;
  //   this.Welcomepage = false;
  //   this.StartTesttab = true;

  //   this.clearTimer();      // safety
  //   this.minutes = 15;
  //   this.seconds = 0;
  //   this.startCountdown();
  //   if (this.selectedCategories && this.selectedCategories.length > 0) {
  //     this.selectedIndex = 0; // auto select first one
  //     const selectedCategory = this.selectedCategories[0];
  //     console.log('Auto-selected category:', selectedCategory);
  //     // optionally trigger your same logic
  //     this.selectCategory(selectedCategory);
  //   }
  //   //console.log(this.selectedCategories);
  // }

//   Starttest() {

//   // show countdown overlay
//   this.showCountdown = true;
//   this.countdownValue = 3;

//   const interval = setInterval(() => {
//     this.countdownValue--;

//     if (this.countdownValue === 0) {
//       clearInterval(interval);

//       // hide countdown
//       this.showCountdown = false;

//       // ===== EXISTING LOGIC (UNCHANGED) =====
//       this.StartAssessmenttab = false;
//       this.Welcomepage = false;
//       this.StartTesttab = true;

//       this.clearTimer();      // safety
//       // this.minutes = 15;
//       // this.seconds = 0;
//       // this.startCountdown();

//       if (this.selectedCategories && this.selectedCategories.length > 0) {
//         this.selectedIndex = 0; // auto select first one
//         const selectedCategory = this.selectedCategories[0];
//         console.log('Auto-selected category:', selectedCategory);
//         this.selectCategory(selectedCategory);
//       }
//       // =====================================
//     }
//   }, 1000);
// }
Starttest() {

  // show countdown overlay
  this.showCountdown = true;
  this.countdownValue = 3;

  const interval = setInterval(() => {
    this.countdownValue--;

    if (this.countdownValue === 0) {
      clearInterval(interval);

      this.showCountdown = false;

      // ===== UI SWITCH =====
      this.StartAssessmenttab = false;
      this.Welcomepage = false;
      this.StartTesttab = true;

      // ===== TIMER LOGIC (NEW) =====
      this.calculateTotalTime();

      // ===== LOAD FIRST CATEGORY =====
      if (this.selectedCategories.length > 0) {
        this.selectedIndex = 0;
        this.selectCategory(this.selectedCategories[0]);
      }
    }
  }, 1000);
}

  // private startCountdown(): void {
  //   // get the target end time (accurate to the millisecond)
  //   this.targetTime = Date.now() + (this.minutes * 60 + this.seconds) * 1000;

  //   this.timer = setInterval(() => {
  //     const now = Date.now();
  //     const remaining = Math.max(0, this.targetTime - now); // in ms

  //     const totalSeconds = Math.floor(remaining / 1000);
  //     this.minutes = Math.floor(totalSeconds / 60);
  //     this.seconds = totalSeconds % 60;

  //     if (totalSeconds <= 0) {
  //       this.clearTimer();
  //       alert('⏰ Time is up!');
  //     }
  //   }, 1000);
  // }

  // private restartTimer(): void {
  //   this.clearTimer();
  //   this.minutes = 15;
  //   this.seconds = 0;
  //   this.startCountdown();
  // }

  calculateTotalTime() {
  this.totalTimeMinutes = this.selectedCategories
    .reduce((sum, c) => sum + (c.DurationMinutes || 0), 0);

  this.startTimer();
}

startTimer() {
  this.clearTimer();

  this.remainingSeconds = this.totalTimeMinutes * 60;

  this.timerRef = setInterval(() => {
    this.remainingSeconds--;

    this.minutes = Math.floor(this.remainingSeconds / 60);
    this.seconds = this.remainingSeconds % 60;

    if (this.remainingSeconds <= 0) {
      this.clearTimer();
      this.openReviewPopup(); // ⏰ auto submit
    }
  }, 1000);
}

  // private clearTimer(): void {
  //   if (this.timer) {
  //     clearInterval(this.timer);
  //     this.timer = null;
  //   }
  // }
  private clearTimer(): void {
  if (this.timerRef) {
    clearInterval(this.timerRef);
    this.timerRef = null;
  }
}


  async GetJobseekerAssessmentTestQuestion(category: any) {
    debugger;
    //console.log(SelectId);
    var Id = category.Id;
    try {
      const saveDataResponse: any = await this.AssessmentService.GetJobseekerAssessmentTestQuestion(Id);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];
      if (this.State === EnumStatus.Success) {
        this.QuestionList = saveDataResponse.Data;
        console.log(this.QuestionList, 'QuestionList');
        this.loadQuestion(this.currentIndex);
      }
      else {
        this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }
    }
    catch (ex) {

    };
  }
  async GetAssesmentcategories() {
    debugger
    //console.log(SelectId);
    var UserId = this.sSOLoginDataModel.UserID;
    try {
      const saveDataResponse: any = await this.AssessmentService.GetAssessmentList(UserId);
      this.State = saveDataResponse['State'];
      this.Message = saveDataResponse['Message'];
      this.ErrorMessage = saveDataResponse['ErrorMessage'];
      debugger;
      if (this.State === EnumStatus.Success) {
        this.categories = saveDataResponse.Data;
      }
      else {
          this.toastr.error(this.ErrorMessage || 'Something went wrong');
      }

    }
    catch (ex) {

    };
  }



  // toggleCategory(category: any) {
  //   debugger;
  //   const index = this.selectedCategories.indexOf(category);

  //   if (index > -1) {
  //     // Deselect if already selected
  //     this.selectedCategories.splice(index, 1);
  //   } else {
  //     // Only allow max 3 selections
  //     if (this.selectedCategories.length < 3) {
  //       this.selectedCategories.push(category);
  //     }
  //     else {
  //       this.openDeleteModal();
  //       //alert('You can select only 3 categories');
  //     }
  //   }
  // }

  toggleCategory(category: any) {
  const index = this.selectedCategories.indexOf(category);

  if (index > -1) {
    // deselect
    this.selectedCategories.splice(index, 1);
  } else {
    // allow unlimited selection
    this.selectedCategories.push(category);
  }
}



  // selectCategory(category: any) {
  //   // If the same card is clicked again, deselect it
  //   this.selectedCategory = (this.selectedCategory === category) ? null : category;
  //   this.GetJobseekerAssessmentTestQuestion(category);
  // }

  selectCategory(category: any) {
  this.selectedCategory = category;

  if (!this.categoryAnswers[category.Id]) {
    this.categoryAnswers[category.Id] = {};
  }

  this.GetJobseekerAssessmentTestQuestion(category);
}


  // onOptionSelect(questionId: number, selectedOption: string) {
  //   // store answer
  //   this.answers[questionId] = selectedOption;

  //   // update answeredList (insert or replace)
  //   const existing = this.answeredList.find(q => q.Id === questionId);
  //   if (existing) {
  //     existing.Answer = selectedOption;
  //   } else {
  //     this.answeredList.push({ Id: questionId, Answer: selectedOption });
  //   }

  //   console.log('Answered List:', this.answeredList);
  // }

  onOptionSelect(questionId: number, selectedOption: number) {

  if (!this.selectedCategory) {
    return;
  }

  const categoryId = this.selectedCategory.Id;

  // initialize category if not present
  if (!this.categoryAnswers[categoryId]) {
    this.categoryAnswers[categoryId] = {};
  }

  // save answer category-wise
  this.categoryAnswers[categoryId][questionId] = selectedOption;

  console.log('Category Answers:', this.categoryAnswers);
}

  // isAnswered(questionId: number): boolean {
  //   return !!this.answers[questionId];
  // }


  isAnswered(questionId: number): boolean {
  if (!this.selectedCategory) {
    return false;
  }

  const categoryId = this.selectedCategory.Id;
  return !!this.categoryAnswers[categoryId]?.[questionId];
}

  nextQuestion() {
    if (this.currentIndex < this.QuestionList.length - 1) {
      this.currentIndex++;
      this.loadQuestion(this.currentIndex);
    }
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.loadQuestion(this.currentIndex);
    }
  }

  goToQuestion(index: number) {
    this.currentIndex = index;
    this.loadQuestion(index);
  }


  async openDeleteModal(): Promise<boolean> {
  // save the selected ID

    return new Promise((resolve) => {
      this.modalService.open(this.modalTemplate, {
        size: 'sm',
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

  //FinalSave() {
  //  console.log(this.answeredList, 'Answer list Given by Deepak');

  //  const answerList = this.QuestionList.map((q: { Id: string | number; questions: any; }) => ({
  //    QuestionId: q.Id,
  //    QuestionText: q.questions,
  //    SelectedAnswer: this.answers || null
  //  }));

  //  console.log('🧠 Final Answers:', answerList);

  //   //TODO: call API to save answerList if needed
  //   //this.myService.saveAnswers(answerList).subscribe(...)
  //}
  //FinalSave() {
  

  //  console.log('🧠 Final Answers:', answerList);

  //  await this.AssessmentService.saveAnswers(answerList).subscribe({
  //    next: (res) => {
  //      console.log('✅ Assessment Result:', res);
  //      alert(`Total: ${res.totalAttempted}, Correct: ${res.correctCount}, Incorrect: ${res.incorrectCount}`);
  //    },
  //    error: (err) => console.error('Error saving answers:', err)
  //  });
  //}
  // async FinalSave() {
  //   debugger;
  //   //console.log(SelectId);
  //   const userId = this.sSOLoginDataModel.UserID; // get from auth or context
  //   const answerList = this.QuestionList.map((q: { Id: string | number; questions: any; }) => ({
  //       QuestionId: q.Id,
  //       QuestionText: q.questions,
  //       SelectedAnswer: this.answers || null
  //     }));
  //   try {
  //     const saveDataResponse: any = await this.AssessmentService.CorrectSaveAnswers(answerList, userId);
  //     this.State = saveDataResponse['State'];
  //     this.Message = saveDataResponse['Message'];
  //     this.ErrorMessage = saveDataResponse['ErrorMessage'];
  //     debugger;
  //     if (this.State === EnumStatus.Success) {
  //       this.toastr.success("Result Successfully Save.")
  //   //    this.categories = saveDataResponse.Data;
  //     }
  //     else {
  //       this.toastr.error(this.ErrorMessage || 'Something went wrong');
  //     }

  //   }
  //   catch (ex) {

  //   };
  // }

  async FinalSave() {
    debugger
     this.clearTimer();
  const userId = this.sSOLoginDataModel.UserID;

  const answerList: any[] = [];
console.log(this.selectedCategories[0].questions);
debugger
  // loop through categories
  

  

  // try {
  //   const saveDataResponse: any =
  //     await this.AssessmentService.CorrectSaveAnswers(answerList, userId);

  //   this.State = saveDataResponse.State;
  //   this.Message = saveDataResponse.Message;
  //   this.ErrorMessage = saveDataResponse.ErrorMessage;
  //   if (this.State === EnumStatus.Success) {
  //      //  INSERT USER ATTEMPT
  //     await this.AssessmentService.InsertUserAttempt(userId);
  //     this.toastr.success('Result successfully saved');
  //     await this.loadScoreAndOpenPopup();
  //   } else {
  //     this.toastr.error(this.ErrorMessage || 'Something went wrong');
  //   }

  // } catch (ex) {
  //   console.error(ex);
  //   this.toastr.error('Server error while saving answers');
  // }
  try {
  // 1️⃣ INSERT USER ATTEMPT FIRST
  const attemptResponse: any =
    await this.AssessmentService.InsertUserAttempt(userId);

  if (attemptResponse.State !== EnumStatus.Success) {
    this.toastr.error(attemptResponse.ErrorMessage || 'Unable to create attempt');
    return;
  }

  const attemptId = attemptResponse.Data[0].AttemptId; // IMPORTANT

  for (const categoryId in this.categoryAnswers) {
    const sectionId = Number(categoryId);
    const assessmentTypeId = this.getAssessmentTypeIdBySection(sectionId);
    const questions = this.categoryAnswers[categoryId];

    // loop through questions of that category
    for (const questionId in questions) {
      answerList.push({
        SectionId: sectionId,
        QuestionId: Number(questionId),
        AnswerId: questions[questionId],
        AssessmentTypeId: assessmentTypeId, 
        UserId: userId,
        AttemptId: attemptId 
      });
    }
  }

  console.log('🧠 Final Answers Payload:', answerList);

  if (answerList.length === 0) {
    this.toastr.warning('No answers selected');
    return;
  }
  // 2️⃣ SAVE ANSWERS WITH AttemptId
  const saveDataResponse: any =
    await this.AssessmentService.CorrectSaveAnswers(answerList, userId);

  this.State = saveDataResponse.State;
  this.Message = saveDataResponse.Message;
  this.ErrorMessage = saveDataResponse.ErrorMessage;

  if (this.State === EnumStatus.Success) {
    await this.AssessmentService.finalizeAssessment(userId,attemptId);
    this.toastr.success('Result successfully saved');
    await this.loadScoreAndOpenPopup();
  } else {
    this.toastr.error(this.ErrorMessage || 'Something went wrong');
  }

} catch (ex) {
  console.error(ex);
  this.toastr.error('Server error while saving answers');
}

}

async loadScoreAndOpenPopup() {
  try {
    const scoreResponse: any =
      await this.AssessmentService.getAssessmentScore(this.sSOLoginDataModel.UserID);
debugger
    if (scoreResponse.State === EnumStatus.Success) {
      const data = scoreResponse.Data;
       // 🔥 Split based on AssessmentTypeId
      this.selfAssessmentScores = data.filter((x: any) => x.AssessmentTypeId === 1);
      this.psychometricScores = data.filter((x: any) => x.AssessmentTypeId === 2);
      this.showScorePopup = true; // 🔥 OPEN POPUP
    } else {
      this.toastr.error('Unable to calculate score');
    }
  } catch (err) {
    this.toastr.error('Error while fetching score');
  }
}
prepareAnswerList() {
  const answerList: any[] = [];

  for (const assessmentId in this.categoryAnswers) {
    const questions = this.categoryAnswers[assessmentId];

    for (const questionId in questions) {
      answerList.push({
        AssessmentId: Number(assessmentId),
        QuestionId: Number(questionId),
        SelectedOptionId: questions[questionId], // ✅ OPTION ID
        UserId: this.userId
      });
    }
  }
  return answerList;
}

closeScorePopup() {
  this.showScorePopup = false;
  this.scoreList = [];
}

openStartTestConfirm() {
    // if (this.selectedCategories.length !== 3) {
    //   this.toastr.warning('Please select exactly 3 categories');
    //   return;
    // }
   if (this.selectedCategories.length < this.minCategoriesRequired) {
    this.toastr.warning(`Please select at least ${this.minCategoriesRequired} category(s)`);
    return;
  }
    console.log('Start Test button clicked');
debugger
    this.modalService.open(this.startTestConfirm, {
      size: 'sm',
      backdrop: 'static',
      centered: true
    }).result.then(
      (result) => {
        if (result === 'ok') {
          this.Starttest();
        }
      },
      () => {
        // Cancel → do nothing
      }
    );
  }

  getAttemptedCount(category: any): number {
  return Object.keys(this.categoryAnswers[category.Id] || {}).length;
}
isLastQuestion(): boolean {
  if (!this.selectedCategory) return false;

  const isLastQ = this.currentIndex === this.QuestionList.length - 1;
  const isLastCategory =
    this.selectedCategories.indexOf(this.selectedCategory) ===
    this.selectedCategories.length - 1;

  return isLastQ && isLastCategory;
}

openReviewPopup() {
  this.modalService.open(this.reviewPopup, {
    size: 'md',
    backdrop: 'static',
    centered: true
  });
}

submitFromPopup(modal: any) {
  modal.close();
  this.FinalSave(); // reuse your existing logic
}

clearAnswer(questionId: number): void {

  if (!this.selectedCategory) {
    return;
  }

  const categoryId = this.selectedCategory.Id;

  // If category exists and question is answered
  if (this.categoryAnswers[categoryId]?.[questionId]) {
    delete this.categoryAnswers[categoryId][questionId];
  }

  console.log('After clear:', this.categoryAnswers);
}


}
