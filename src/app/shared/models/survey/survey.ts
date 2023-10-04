import {Area} from "../system/area";
import {Education} from "../system/education";
import {ArmyRank} from "../system/armyRank";
import {Vtsh} from "../system/vtsh";
import {Position} from "../calculation/position/position";
import {Vacancy} from "../vacancy/vacancy";
import {StepGroup} from "../step/stepGroup";
import {Step} from "../step/step";
import {MedicalStatus} from "../system/medicalStatus";
import {SurveyDriver} from "./surveyDriver";
import {SurveyRelative} from "./surveyRelative";
import {Profile} from "../profile/profile";
import {SurveyExecutor} from "./surveyExecutor";

export interface Survey{
  id:number;
  userId:number;
  iin:string;
  fullName:string;
  email:string;
  phone:string;
  //Foreign
  birthAreaId:number;
  birthArea: Area | null;
  //Foreign

  region:string;
  city:string;
  home: string | null;
  appartment: string | null;
  street: string | null;
  //Education Foreign Key
  educationId:number;
  education : Education | null;
  //Education Foreign Key
  experienced:boolean;
  served:boolean;
  servedArmyNumber:string|null;
  positionName:string|null;
  //ArmyRank
  armyRankId:number|null;
  armyRank:ArmyRank | null;
  //ArmyRank
  vtShServed:boolean;
  //VTSH
  vtShId:number|null;
  vtSh : Vtsh | null;
  //VTSH
  vtShYear:string|null;
  //Position Id
  positionId:number|null;
  position : Position | null;
  //Position Id
  armyNumber:string|null;
  contractYear:number;
  //Area
  areaId:number;
  area:Area | null;
  //Area
  //Vacancy
  vacancyId:number|null;
  vacancy:Vacancy|null;
  //Vacancy

  imageUrl :string;
  autoBiography:string;
  educationUrl:string;
  incomePropertyUrl:string;
  employmentUrl : string;
  millitaryUrl : string;
  specialCheckUrl : string;
  identityCardUrl : string;
  tuberUrl:string|null;
  dermatologUrl:string|null;
  psychoNeurologicalUrl : string|null;
  narcologicalUrl : string|null
  agreed : boolean;
  signKey : string;
  //StepGroup
  stepGroupId : number | null;
  stepGroup : StepGroup|null;
  //StepGroup
  //Step
  currentStepId : number | null;
  currentStep : Step | null;
  //Step
  status:number;
  //Medical Status
  medicalStatusId : number | null;
  medicalStatus : MedicalStatus | null;
  //Medical Status
  createdAt : Date;
  updatedAt : Date | null;


  surveyDrivers : SurveyDriver[] | null;
  surveyRelatives:SurveyRelative[]|null;
  surveyExecutor:SurveyExecutor|null;
  profiles:Profile[]|null;



}
