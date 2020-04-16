import {
  Controller,
  Post,
  Response,
  Body,
  HttpStatus,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dtos/create-participant.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('participants')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async index(@Response() res) {
    const participants = await this.participantsService.findAll();

    return res.json(participants);
  }

  @Post()
  public async register(@Response() res, @Body() participant: CreateParticipantDto) {
    const result = await this.participantsService.register(participant);

    if (!result.success){
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }

    return res.status(HttpStatus.OK).json(result);
  }
}
