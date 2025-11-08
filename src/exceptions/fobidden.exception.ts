import { HttpException, HttpStatus } from '@nestjs/common';

export class FobiddenException extends HttpException {
  constructor() {
    super('Fobidden', HttpStatus.FORBIDDEN);
  }
}
