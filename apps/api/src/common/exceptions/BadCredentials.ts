import { HttpException, HttpStatus } from '@nestjs/common';

export class BadCredentialsException extends HttpException {
  constructor() {
    super('Bad credentials', HttpStatus.UNAUTHORIZED);
  }
}
