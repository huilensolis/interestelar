import { Injectable } from '@nestjs/common';

@Injectable()
export class ColumnsService {
  create() {
    return 'This action adds a new column';
  }

  findAll() {
    return `This action returns all columns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} column`;
  }

  update(id: number) {
    return `This action updates a #${id} column`;
  }

  remove(id: number) {
    return `This action removes a #${id} column`;
  }
}
