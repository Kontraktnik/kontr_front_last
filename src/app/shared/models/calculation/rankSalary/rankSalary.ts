import {ArmyRank} from "../../system/armyRank";

export interface RankSalary{
  id:number;
  armyRankId: number;
  salary:number;
  //Foreigners
  armyRank : ArmyRank | null;
}
