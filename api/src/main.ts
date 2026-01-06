import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { configureBodyParser } from './lib/configure-body-parser';
import { configureCors } from './lib/configure-cors';
import { NestExpressApplication } from '@nestjs/platform-express';
import { createServer } from 'http';
import { initPlayersCollaborationSocket } from './common/middleware/socket';
import * as bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bodyParser: false,
  });

  // Add cookie parser before other middleware
  app.use(cookieParser());

  configureBodyParser(app);
  configureCors(app);

  // Create HTTP server
  const httpServer = createServer(app.getHttpAdapter().getInstance());

  // Initialize Socket.IO with HTTP server
  initPlayersCollaborationSocket(httpServer);

  // Get the HTTP adapter host
  const httpAdapter = app.get(HttpAdapterHost);

  // Apply global exception filter
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  // Configure validation pipe with transform enabled
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Twinara API')
    .setDescription('The Twinara API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);

  // Hide routes and schemas in production except for generate and check-answer
  if (process.env.NODE_ENV === 'production') {
    // Filter paths
    const paths = document.paths;
    const allowedPaths = {
      '/re-captcha/generate/{type}/{wordLength}/{apiKey}':
        paths['/re-captcha/generate/{type}/{wordLength}/{apiKey}'],
      '/re-captcha/check-answer': paths['/re-captcha/check-answer'],
    };
    document.paths = allowedPaths;

    // Filter schemas
    const schemas = document.components.schemas;
    const allowedSchemas = {
      QuestionType: schemas.QuestionType,
      CheckReCaptchaAnswerDto: schemas.CheckReCaptchaAnswerDto,
    };
    document.components.schemas = allowedSchemas;
  }

  SwaggerModule.setup('api', app, document);

  app.use(
    bodyParser.raw({
      type: 'application/json',
      verify: (req, res, buf) => {
        if (req.url.startsWith('/payments/webhook')) {
          (req as any).rawBody = buf;
        }
      },
    }),
  );

  // Important: Listen with the httpServer instead of app
  // await new Promise<void>((resolve) =>
  //   httpServer.listen(5001, () => resolve()),
  // );
  // await app.init();
  // await httpServer.listen(process.env.PORT || 5001);
  // console.log(
  //   'Application is running on: http://localhost:' + process.env.PORT,
  // );
  const port = process.env.PORT || 5001;

  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();
