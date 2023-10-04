import {Survey} from "../models/survey/survey";

export class StepsConstant{
  //Director
  public static directorRequestStep = [2];
  public static directorConfirmRStep = [1];
  //Executor
  public static executorsRequestStep = [3,4,6,8,9];
  public static executorConfirmRStep = [2];

  //All Statuses
  public static SendedStatus = 1;
  public static AcceptedStatus = 2;
  public static SpecialStatus = 3;
  public static PrepareToMedStatus = 4;
  public static MedStatus = 5;
  public static PrepareToPsychoStatus = 6;
  public static PsychoStatus = 7;
  public static SendOfferStatus = 8;
  public static SigningStatus = 9;

  public static Accepted = 1;
  public static Rejected = -1;
  public static OnWork = 0;







}
