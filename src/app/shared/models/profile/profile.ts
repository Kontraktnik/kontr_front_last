import {StepGroup} from "../step/stepGroup";
import {Step} from "../step/step";
import {Survey} from "../survey/survey";
import {Area} from "../system/area";
import {IUser} from "../user/user";
import {ProfileFile} from "./profileFile";

export interface Profile{
  id:number;

  stepGroupId:number;
  stepGroup:StepGroup|null;

  stepId:number;
  step:Step|null;

  surveyId:number;
  survey:Survey|null;

  areaId:number;
  area:Area|null;

  requestedUserId:number;
  requestedUser:IUser|null;
  requestedUserIIN:string;
  requestedStatus:number;
  RequestedSIGN:string;

  confirmedUserId:number|null;
  confirmedUser:IUser|null;
  confirmedUserIIN:string|null;
  confirmedStatus:number|null;
  confirmedSIGN : string|null;

  status:number;
  comment:string|null;
  createdAt:Date;
  expiredAt:Date;
  updatedAt:Date|null;


  profileFiles:ProfileFile[]|null;








}
