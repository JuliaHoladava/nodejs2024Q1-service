import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  getAllAlbums(): Album[] {
    return this.albums;
  }

  getAlbumById(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  createAlbum(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = {
      ...createAlbumDto,
      id: uuidv4(),
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);

    if (albumIndex === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    this.albums[albumIndex] = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };

    return this.albums[albumIndex];
  }

  deleteAlbum(id: string): void {
    const index = this.albums.findIndex((album) => album.id === id);

    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    this.albums.splice(index, 1);
  }
}
