import {JobCategory} from "../jobCategory";
import {ServiceYear} from "../serviceYear";

export interface JobYear{

  id:number;
  jobCategoryId:number;
  serviceYearId:number;
  salary:number;
  //foreigners
  jobCategory:JobCategory | null;
  serviceYear : ServiceYear | null;


}
