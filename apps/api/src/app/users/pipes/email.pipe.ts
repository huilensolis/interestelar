import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodValidEmailSchema } from '../models';

@Injectable()
export class IsEmailPipe implements PipeTransform {
  transform(value: string) {
    const isAValidEmail = ZodValidEmailSchema.safeParse(value);

    if (!isAValidEmail.success) {
      throw new BadRequestException('Invalid email');
    }

    return value;
  }
}
