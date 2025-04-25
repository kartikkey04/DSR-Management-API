import {
  Controller, Patch, UseGuards, UseInterceptors, UploadedFile, Req, Body
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
//import { s3Storage } from '../common/s3.service';
import s3Storage = require('multer-s3');
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

interface S3File extends Express.Multer.File {
  location: string; 
  key: string;
  bucket: string;
}

@Controller('users/api/v1')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  @UseInterceptors(FileInterceptor('profilePicture', { storage: s3Storage }))
  @ApiOperation({ summary: 'Update profile' })
  @ApiResponse({ status: 200 })
  async updateProfile(
    @Req() req,
    @Body() dto: UpdateProfileDto,
    @UploadedFile() file: S3File
  ) {
    if (file) {
      dto.profilePicture = file.location; // S3 file URL
    }
    return this.profileService.updateProfile(req.user.id, dto);
  }
}
