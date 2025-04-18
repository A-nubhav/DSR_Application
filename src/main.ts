import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'; // ✅ Import winston
const { combine, timestamp, printf } = winston.format; // ✅ Extract format functions

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: combine(
            timestamp(),
            printf(({ level, message, timestamp }) => {
              return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            }),
          ),
        }),
      ],
    }),
  });

  await app.listen(3000);
}
bootstrap();
