import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  async updateProfile(userId: number, updateProfileDto: UpdateProfileDto): Promise<User> {
    const user = await this.userModel.findByPk(userId);
    if (!user) throw new Error('User not found');

    await user.update(updateProfileDto);
    return user;
  }
}
