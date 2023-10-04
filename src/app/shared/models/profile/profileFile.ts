import {Profile} from "./profile";
import {IUser} from "../user/user";

export interface ProfileFile{
  id:number,
  profileId:number;
  profile:Profile|null;
  file:string|null;
  comment:string|null;
  userId:number;
  user:IUser|null;


}
