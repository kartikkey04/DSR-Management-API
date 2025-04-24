import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SequelizeRootModule } from './database/sequelize.module';
import { AuthModule } from './auth/auth.module';
import { RedisModule } from './redis/redis.module';
import { MailerModule } from './mailer/mailer.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    SequelizeRootModule,
    AuthModule,
    RedisModule,
    MailerModule,
    ProfileModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
