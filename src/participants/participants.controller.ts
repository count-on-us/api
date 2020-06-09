import {
  Controller,
  Post,
  Response,
  Body,
  HttpStatus,
  Get,
  UseGuards,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ParticipantsService } from './participants.service';
import { CreateParticipantDto } from './dtos/create-participant.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateParticipantDto } from './dtos/update-participant.dto';

@Controller('participants')
@ApiBearerAuth()
@ApiTags('participant')
export class ParticipantsController {
  constructor(private readonly participantsService: ParticipantsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    description: 'The participants list is successfully retrivied.',
  })
  @ApiResponse({
    status: 401,
    description: 'The requester is unauthorized to make this request.',
  })
  public async index(@Response() res) {
    const participants = await this.participantsService.findAll();

    return res.json(participants);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The participants is successfully retrivied.',
  })
  @ApiResponse({
    status: 401,
    description: 'The requester is unauthorized to make this request.',
  })
  @ApiResponse({
    status: 404,
    description: 'The participant was not found.',
  })
  public async show(
    @Param('id', ParseIntPipe) participantId: number,
    @Response() res
  ) {
    const participant = await this.participantsService.findOne(participantId);

    if (!participant) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: 'Not found',
        message: 'Participant not found',
      })
    }

    return res.json(await this.participantsService.findOne(participantId));
  }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'The participants is successfully registered.',
  })
  public async register(@Response() res, @Body() participant: CreateParticipantDto) {
    const result = await this.participantsService.register(participant);

    if (!result.success){
      return res.status(HttpStatus.BAD_REQUEST).json(result);
    }

    return res.status(HttpStatus.OK).json(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id')
  @ApiResponse({
    status: 200,
    description: 'The participants is successfully updated.',
  })
  @ApiResponse({
    status: 401,
    description: 'The requester is unauthorized to make this request.',
  })
  @ApiResponse({
    status: 404,
    description: 'The participant was not found.',
  })
  public async update(
    @Param('id', ParseIntPipe) participantId: number,
    @Response() res,
    @Body() participantObject: UpdateParticipantDto
  ) {
    const participant = await this.participantsService.findOne(participantId);

    if (!participant) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: "Participant not found",
      });
    }

    const newParticipant = await this.participantsService.update(participantId, participantObject);
    return res.json(newParticipant);
  }
}
