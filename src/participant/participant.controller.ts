import {
  Controller,
  Post,
  Response,
  Body,
  HttpStatus
} from '@nestjs/common';
import { ParticipantService } from './participant.service';
import { CreateParticipantDto } from './dtos/create-participant.dto';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Post()
  public async register(@Response() res, @Body() participant: CreateParticipantDto) {
    const result = await this.participantService.register(participant);

    if (!result.success){
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }

    return res.status(HttpStatus.OK).json(result);
  }
}
