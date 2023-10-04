import {Position} from "../calculation/position/position";
import {JobCategory} from "../calculation/jobCategory";
import {Area} from "../system/area";
import {ArmyType} from "../system/armyType";
import {ArmyRegion} from "../system/armyRegion";
import {SecretLevel} from "../calculation/secretLevel";
import {Qualification} from "../calculation/qualification";
import {IUser} from "../user/user";

export interface Vacancy{
  id: number;
  positionId:number;
  jobCategoryId:number;
  areaId:number;
  city:string;
  armyTypeId:number;
  armyRegionId: number;
  secretLevelId:number;
  qualificationId:number;
  authorId:number;
  quantity:number;
  status:boolean;
  descriptionRu:string;
  descriptionKz:string | null;
  descriptionEn:string | null;
  createdAt : Date;
  updatedAt : Date | null;

  //Foreigners
  position:Position | null;
  jobCategory: JobCategory | null;
  area : Area | null;
  armyType : ArmyType | null;
  armyRegion:ArmyRegion|null;
  secretLevel:SecretLevel | null;
  qualification: Qualification|null;
  author: IUser | null;






}
