import mongoose, { Schema, Document } from 'mongoose';
import { ITeam, ITeamResource } from './team.model';
import { Positions } from '../constants/positions.constant';
import { Nationality, nationalityImagePath } from '../constants/nationality.constant';

export interface IPlayer extends Document {
  sportMonksId: number;
  cityId: string | null;
  commonName: string;
  countryId: number;
  dateOfBirth: string;
  detailedPositionId: string | null;
  displayName: string;
  firstName: string;
  gender: string;
  height: number;
  imagePath: string;
  lastName: string;
  name: string;
  nationalityId: number;
  positionId: number;
  sportId: number;
  typeId: number;
  weight: number;
  provider: string;
  providerId: number;
  deleted: boolean;
  team: ITeam['_id'];
  isStarred: boolean;
  bluredImage: any|Buffer;
  age: number;
  calculateYears(): number,
  getPosition(): string |null,
  getNationality(): string |null,
  getPlayerInfo(): IPlayerInfo,
  comparePlayerYears(player:IPlayer): number,
}

export interface IPlayerInfo {
  team: ITeam, 
  name: string, 
  age:number,
  detailedPositionId: string | null, 
  positionId: number, 
  id: number, 
  nationalityId: number | null, 
  teamPosition: string | null,
  imagePath:string | null,
  imagePathBase64:string,
}

export interface IPlayerResource {
  name: string,
  age: number,
  detailedPositionId: string | null,
  position: string,
  positionId: number,
  id: number,
  imagePath:string | null
  nationality: {
    nationalityId: number | null
    nationalityImagePath: string | null,
    name: string
  }
  team: ITeamResource
}

const PlayerSchema: Schema = new Schema({
  sportMonksId: { type: Number, required: true },
  cityId: { type: Schema.Types.String, default: null },
  commonName: { type: String, required: true },
  countryId: { type: Number, required: true },
  dateOfBirth: { type: String, required: true },
  detailedPositionId: { type: Schema.Types.String, default: null },
  displayName: { type: String, required: true },
  firstName: { type: String, required: true },
  gender: { type: String, required: true },
  height: { type: Number, required: true },
  imagePath: { type: String, required: true },
  lastName: { type: String, required: true },
  name: { type: String, required: true },
  nationalityId: { type: Number, required: true },
  positionId: { type: Number, required: true },
  sportId: { type: Number, required: true },
  typeId: { type: Number, required: true },
  weight: { type: Number, required: true },
  provider: { type: String, required: true },
  providerId: { type: Number, required: true },
  deleted: { type: Boolean, default: false },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'teams', required: true },
  isStarred: { type: Boolean, default: false },
});

PlayerSchema.methods.calculateYears = function (): number {
  const startDate = new Date(this.dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - startDate.getFullYear();

  const isBeforeBirthday =
    today.getMonth() < startDate.getMonth() ||
    (today.getMonth() === startDate.getMonth() && today.getDate() < startDate.getDate());

  if (isBeforeBirthday) {
    age--;
  }

  return age;
};

PlayerSchema.methods.getPosition = function (): string | null {
  console.log("this.position", this.positionId)
  return Positions[this.positionId] || ""
}

PlayerSchema.methods.getNationalityName = function (): string | null {
  return Nationality[this.nationalityId] || ""
}
PlayerSchema.methods.getNationalityImage = function (): string | null {
  const nationality = this.getNationalityName()
  //generate link for nationality from nationlaity name 
  //source https://playfootball.games/
  return nationality ? `${nationalityImagePath}${nationality}.svg` : ""
}

PlayerSchema.methods.comparePlayerYears = function (player:IPlayer): number {
  //return -1 if selected player is younger
  //return 0 if selected player is same age as the comapred player
  //return 1 if selected player is older
  return Math.sign(player.calculateYears() - this.calculateYears())
}

PlayerSchema.post('findOne', function (doc:IPlayer|null) {
  if(doc){
    doc.age= doc.calculateYears()
  }
});

PlayerSchema.post('find', function (docs:IPlayer[]) {
  docs.forEach(doc => {
    if (doc) {
      doc.age= doc.calculateYears()
    }
  })
})

PlayerSchema.methods.getPlayerInfo = function (): IPlayerResource {
  const { team, name, detailedPositionId, positionId, id, nationalityId, teamPosition, imagePath }: IPlayerInfo = this as IPlayerInfo
  return {
    id,
    name,
    age:this.calculateYears(),
    detailedPositionId,
    position: this.getPosition(),
    positionId,
    imagePath,
    nationality: {
      name: this.getNationalityName(),
      nationalityImagePath: this.getNationalityImage(),
      nationalityId,
    },
    team: team.getTeamInfo()
  }
}

export const Player = mongoose.model<IPlayer>('players', PlayerSchema);
