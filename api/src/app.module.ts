import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReCaptchaModule } from './re-captcha/re-captcha.module';
import { GameEngineModule } from './game-engine/game-engine.module';
import { GameScoreModule } from './game-score/game-score.module';
import { PaymentsModule } from './payments/payments.module';
import { EmailModule } from './email/email.module';
import { UrlShortenerModule } from './url-shortener/url-shortener.module';
import { CardIdsModule } from './card-ids/card-ids.module';
import { UdemyUsersModule } from './udemy-users/udemy-users.module';
import { CourseProgressModule } from './course-progress/course-progress.module';
import { OrganizationModule } from './organization/organization.module';
import { DementiaProfilesModule } from './dementia-profiles/dementia-profiles.module';
import { DementiaUserActivitiesModule } from './dementia-user-activities/dementia-user-activities.module';
import { DementiaUserChatMessagesModule } from './dementia-user-chat-messages/dementia-user-chat-messages.module';
import { MemoryAiAgentModule } from './memory-ai-agent/memory-ai-agent.module';
import { TwinaraActivityGameModule } from './twinara-activity-game/twinara-activity-game.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: config.get('EMAIL_HOST') || process.env.EMAIL_HOST,
          port: Number(config.get('EMAIL_PORT') || process.env.EMAIL_PORT),
          secure: true,
          auth: {
            user: config.get('EMAIL_USER') || process.env.EMAIL_USER || '',
            pass: config.get('EMAIL_PASS') || process.env.EMAIL_PASS || '',
          },
        },
        defaults: {
          from: config.get('MAIL_FROM_NAME') || process.env.MAIL_FROM_NAME,
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
        autoLoadEntities: true,
        ssl:
          process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
        entitySkipConstructor: true,
        useUTC: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    ReCaptchaModule,
    GameEngineModule,
    GameScoreModule,
    PaymentsModule,
    EmailModule,
    UrlShortenerModule,
    CardIdsModule,
    UdemyUsersModule,
    CourseProgressModule,
    OrganizationModule,
    DementiaProfilesModule,
    DementiaUserActivitiesModule,
    DementiaUserChatMessagesModule,
    MemoryAiAgentModule,
    TwinaraActivityGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
