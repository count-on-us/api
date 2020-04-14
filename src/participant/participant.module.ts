import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Participant } from './participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Participant])],
  providers: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
