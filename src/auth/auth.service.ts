import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
 
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto) {
    const hashed = await bcrypt.hash(signupDto.password, 10);
    const user = await this.userModel.create({
        ...signupDto, password: hashed,
        isVerified: false,
        profilePic: ''
    });

    return { message: 'User registered successfully', user };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ where: { email: loginDto.email } });
    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email });
    return { access_token: token };
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ where: { email } });
  }
  

  
}
