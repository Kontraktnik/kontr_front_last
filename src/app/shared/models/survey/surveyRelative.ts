import {Relative} from "../system/relative";
import {Survey} from "./survey";

export interface SurveyRelative{
  relativeId : number;
  relative:Relative | null;
  surveyId : number;
  survey:Survey | null;
  name:string;
  surName:string;
  patronomic: string|null;
  iin:string;
  birthDate:string;
}
