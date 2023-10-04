import {JobCategory} from "../jobCategory";
import {SecretLevel} from "../secretLevel";
import {ArmyType} from "../../system/armyType";
import {CategoryPosition} from "../categoryPosition";

export interface Position{
  id:number;
  titleRu: string;
  titleEn: string;
  titleKz: string;
  jobCategoryId : number;
  secretLevelId: number;
  armyTypeId? : number;
  categoryPositionId? : number;

  //Foreigners
  jobCategory: JobCategory | null;
  secretLevel: SecretLevel | null;
  armyType : ArmyType | null;
  categoryPosition : CategoryPosition | null;

}
