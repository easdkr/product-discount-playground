import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient<
  Prisma.PrismaClientOptions,
  'query' | 'error'
> {
  public constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
        {
          emit: 'event',
          level: 'error',
        },
      ],
    });

    this.$on('query', (e) => {
      console.log('Query: ' + e.query);
      console.log('Params: ' + e.params);
      console.log('Duration: ' + e.duration + 'ms');
    });
  }
}
