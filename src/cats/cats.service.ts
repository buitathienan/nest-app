import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cat: Cat[] = [];

  findAll() {
    return this.cat;
  }

  create(cat: Cat) {
    this.cat.push(cat);
  }
}
