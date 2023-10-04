import {Survey} from "./survey";
import {DriverLicense} from "../system/driverLicense";

export interface SurveyDriver {
  surveyId:number;
  driverLicenseId:null;
  survey:Survey|null;
  driverLicense:DriverLicense | null;


}
