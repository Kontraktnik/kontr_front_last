export class SurveyExecutorCreate{
  constructor(survey:number, executor:number, director:number) {
    this.surveyId = survey;
    this.executorId = executor;
    this.directorId = director;
  }
  surveyId : number;
  executorId:number;
  directorId:number;
}
