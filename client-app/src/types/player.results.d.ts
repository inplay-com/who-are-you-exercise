import { Team } from "./team";
import { ResultData } from "./result.data";
import { Player } from "./player";

export interface PlayerWithResult extends Player {
  result: ResultData;
  age: number;
  detailedPositionId: string;
  positionId: number;
  nationality: {
    name: string;
    nationalityImagePath: string;
    nationalityId: number;
  };
}