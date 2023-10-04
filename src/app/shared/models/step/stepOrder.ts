import {Step} from "./step";

export interface StepOrder{
  id:number;
  stepId:number;
  previousStepId:number|null;
  previousStep : Step|null;
  nextStepId:number|null;
  nextStep : Step|null
}
