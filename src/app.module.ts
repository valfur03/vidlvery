import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from './jobs/jobs.module';
import { MailerModule } from './mailer/mailer.module';

@Module({
  imports: [ConfigModule.forRoot(), JobsModule, MailerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
