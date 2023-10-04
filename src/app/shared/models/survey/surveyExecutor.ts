import {Survey} from "./survey";
import {IUser} from "../user/user";

export interface SurveyExecutor{
  surveyId:number;
  executorId:number;
  directorId : number;

  survey:Survey|null;
  executor:IUser|null;
  director:IUser|null;

}
