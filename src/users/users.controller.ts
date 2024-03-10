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
  BadRequestException,
  ParseUUIDPipe,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { plainToClass } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UsersController {
  private users: User[] = [];

  @Get()
  getAllUsers() {
    return this.users;
  }

  @Get(':id')
  getUserById(
    @Param(
      'id',
      new ParseUUIDPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    id: string,
  ) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    this.users.push(newUser);
    return plainToClass(User, newUser, { excludeExtraneousValues: true });
  }

  @Put(':id')
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const user = this.users[userIndex];
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new BadRequestException('Old password is incorrect');
    }

    user.version += 1;
    user.updatedAt = Date.now();
    this.users[userIndex] = {
      ...user,
      password: updatePasswordDto.newPassword,
    };

    return plainToClass(User, this.users[userIndex], {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    this.users.splice(index, 1);
    return { statusCode: HttpStatus.NO_CONTENT };
  }
}
