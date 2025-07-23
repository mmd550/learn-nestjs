import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*
   * Use ValidationPipes globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  /**
   * Swagger Configuration
   */
  const config = new DocumentBuilder()

    .setTitle('Learn NestJs')
    .setDescription('Use the base api URL as http://localhost:3000')
    .setTermsOfService('https://google.com')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT_LICENSE.txt',
    )
    .setVersion('1.0')
    .addServer('http://localhost:3000')
    .build();
  // Instantiate Document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
