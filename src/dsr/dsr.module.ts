import { Module } from '@nestjs/common';
import { DsrController } from './dsr.controller';
import { DsrService } from './dsr.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dsr } from './model/dsr.model';
import { User } from 'src/users/user.model';
import { AuthModule } from 'src/auth/auth.module';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Dsr, User]), AuthModule, JwtModule],
  controllers: [DsrController],
  providers: [DsrService],
})
export class DsrModule {}
