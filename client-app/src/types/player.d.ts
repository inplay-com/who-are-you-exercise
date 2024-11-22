import { Team } from "./team";

export interface Player {
    id: string;
    name: string;
    position: string;
    imagePath: string;
    team: Team
    isFinished:boolean
  }