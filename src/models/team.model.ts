import mongoose, { Schema, Document } from 'mongoose';

export interface ITeam extends Document {
  providerId: number;
  countryId: number;
  founded: number;
  gender: string;
  imagePath: string;
  lastPlayedAt: string;
  name: string;
  provider: string;
  shortCode: string;
  sportId: number;
  sportMonksId: number;
  type: string;
  venueId: number;
  awayColour: string;
  deleted: boolean;
  homeColour: string;
  nickname: string;
  shortName: string;
  cluster: string;
  getTeamInfo():ITeamResource;
}

export interface ITeamResource {
  imagePath: string,
  name: string,
  id: number,
  position: string | null
}

const TeamSchema: Schema = new Schema({
  providerId: { type: Number },
  countryId: { type: Number },
  founded: { type: Number },
  gender: { type: String },
  imagePath: { type: String },
  lastPlayedAt: { type: String },
  name: { type: String },
  provider: { type: String },
  shortCode: { type: String },
  sportId: { type: Number },
  sportMonksId: { type: Number },
  type: { type: String },
  venueId: { type: Number },
  awayColour: { type: String },
  deleted: { type: Boolean, default: false },
  homeColour: { type: String },
  nickname: { type: String },
  shortName: { type: String },
  cluster: { type: String },
});

TeamSchema.methods.getTeamInfo = function (): ITeamResource {
  const { imagePath, name, id, position }: ITeamResource = this as ITeamResource
  return {
    imagePath,
    name,
    id,
    position
  }
}

export const Team = mongoose.model<ITeam>('teams', TeamSchema);
