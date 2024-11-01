import { Injectable } from '@nestjs/common';

export type User = {
  id: string;
  name: string;
  password: string;
};

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      name: 'bam',
      id: '1',
      password: '1223',
    },
  ];

  async findOne(name: string) {
    return this.users.find((user) => user.name === name);
  }
}
