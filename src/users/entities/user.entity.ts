import { Exclude, Expose } from 'class-transformer';

export class User {
  id: string;
  login: string;

  @Exclude()
  password: string;

  version: number;

  @Expose({ name: 'creationTime' })
  createdAt: number;

  @Expose({ name: 'creationTime' })
  updatedAt: number;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
