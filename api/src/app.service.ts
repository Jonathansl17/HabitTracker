import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): {sico: string} {
    return {sico:"ah"};
  }
}
