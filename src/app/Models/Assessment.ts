export interface Section {
  UserID : number;
  Id: number;
  Name: string;
  questions: number;

  MinQuestions: number;
  DurationMinutes: number;
  IsMandatory: boolean;
  AssessmentTypeId: number;
}

// Added this section to remove error in physometric ts or html
export interface Section1 {
  UserID : number;
  Id: number;
  Name: string;
  questions: number;

  //  After adding below 3 line for self assessment phycometric strat giving error thats why we adding this section

  // MinQuestions: number;
  // DurationMinutes: number;
  // IsMandatory: boolean;
}
export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}
