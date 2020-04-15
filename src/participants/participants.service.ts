import { Repository } from 'typeorm';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Participant } from './participant.entity';
import { IParticipantService } from './interfaces/participant-service.interface';
import { CreateParticipantDto } from './dtos/create-participant.dto';
import { UpdateParticipantDto } from './dtos/update-participant.dto';
import { RegistrationStatus } from './interfaces/registration-status.interface';
@Injectable()
export class ParticipantsService implements IParticipantService {
  constructor(
    @InjectRepository(Participant)
    private participantRepository: Repository<Participant>,
  ) {}

  async findAll(): Promise<Participant[]> {
    return await this.participantRepository.find();
  }

  async findByEmail(email: string): Promise<Participant> {
    return await this.participantRepository.findOne({ email });
  }

  async findOne(id: number): Promise<Participant> {
    return await this.participantRepository.findOne(id);
  }

  async register(participant: CreateParticipantDto) {
    let status: RegistrationStatus = {
      success: true,
      message: 'user register',
    };

    try {
      await this.create(participant);
    } catch (err) {
      status = { success: false, message: err };
    }

    return status;
  }

  async create(participantDto: CreateParticipantDto): Promise<Participant> {
    const { email } = participantDto;
    let participant = await this.participantRepository
      .findOne({ where: { email } });

    if (participant) {
      throw new HttpException(
        'This email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }

    participant = this.participantRepository.create(participantDto);
    return await this.participantRepository.save(participant);
  }

  async update(
    id: number,
    participantDto: UpdateParticipantDto
  ): Promise<Participant> {
    const { email } = participantDto;

    let participant = await this.participantRepository
      .findOne({ where: { email } });

    if (participant.id !== id) {
      throw new HttpException(
        'This email is already taken.',
        HttpStatus.BAD_REQUEST,
      );
    }

    participant = this.participantRepository.create(participantDto);
    return await this.participantRepository.save(participant);
  }

  async delete(id: number): Promise<void> {
    await this.participantRepository.delete(id);
  }
}
