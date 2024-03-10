import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpStatus,
  NotFoundException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Controller('track')
export class TracksController {
  private tracks: Track[] = [];

  @Get()
  getAllTracks() {
    return this.tracks;
  }

  @Get(':id')
  getTrackById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  @Post()
  createTrack(@Body() createTrackDto: CreateTrackDto) {
    const newTrack = {
      ...createTrackDto,
      id: uuidv4(),
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  @Put(':id')
  updateTrack(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);

    if (trackIndex === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    this.tracks[trackIndex] = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };

    return this.tracks[trackIndex];
  }

  @Delete(':id')
  deleteTrack(@Param('id', ParseUUIDPipe) id: string) {
    const index = this.tracks.findIndex((track) => track.id === id);

    if (index === -1) {
      throw new NotFoundException(`Trackr with ID ${id} not found`);
    }

    this.tracks.splice(index, 1);
  }
}
