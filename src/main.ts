import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger()

  const config = new DocumentBuilder()
    .setTitle('API NestJS')
    .setDescription('Esta API contempla autenticação JWT, juntamente com rotas seguras e um Module de base.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  logger.log('Executando na porta: ' + process.env.PORT)

  await app.listen(process.env.PORT || 3005);
}
bootstrap();
