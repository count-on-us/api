import { IParticipant } from './participant.interface';
import { CreateParticipantDto } from '../dtos/create-participant.dto';
import { UpdateParticipantDto } from '../dtos/update-participant.dto';
import { RegistrationStatus } from './registration-status.interface';

export interface IParticipantService {
  findAll(): Promise<IParticipant[]>;
  findByEmail(email: string): Promise<IParticipant | null>;
  findOne(id: number): Promise<IParticipant | null>;
  register(participant: CreateParticipantDto): Promise<RegistrationStatus>;
  create(participant: CreateParticipantDto): Promise<IParticipant>;
  update(id: number, participant: UpdateParticipantDto): Promise<IParticipant>;
  delete(id: number): Promise<void>;
}
