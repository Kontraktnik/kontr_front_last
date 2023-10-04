export interface SurveyStats{
  count:number;
  all: AllStats[];
  byStepId: StatsByStepId[];
}

export interface AllStats {
  stepId?: any;
  status: number;
  count: number;
}

export interface StatsByStepId {
  stepId: number;
  status: number;
  count: number;
}
