import {StepGroup} from "./stepGroup";
import {Role} from "../user/role";

export interface Step{
  id:number;
  stepGroupId: number;
  titleRu: string;
  titleEn: string;
  titleKz: string;
  requestedRoleId: number;
  confirmedRoleId: number;
  isFirst: boolean;
  isLast: boolean;
  dayLimit: number;
  //Foreign Tables -> StepGroup Role
  stepGroup:StepGroup | null;
  requestedRole:Role|null;
  confirmedRole : Role | null



}
