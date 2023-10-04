import {List} from "postcss/lib/list";
import {Step} from "./step";

export interface StepGroup{
  id: number,
  titleRu: string,
  titleEn: string,
  titleKz: string,
  order: number,
  steps:Step[]|null
}
