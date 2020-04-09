import { Module } from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { ParticipantController } from './participant.controller';

@Module({
  providers: [ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}
