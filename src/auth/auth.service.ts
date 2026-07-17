import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/schemas/user.schema';
import { SignOptions } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  
  async login(dto: LoginDto) 
  {
    console.log('🔍 Login attempt:', { email: dto.email });
  
    const user = await this.usersService.findByEmail(dto.email);
    console.log('👤 User found:', user);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const passwordValid = await bcrypt.compare(dto.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }
    return this.generateTokens(user._id.toString(), user.email);
    // const isPasswordValid = await this.verifyPassword(
    //   user,
    //   dto.password,
    //   user.password,
    // );
    // console.log('✅ Password valid?:', isPasswordValid);
    
    // if (!isPasswordValid) {
    //   throw new UnauthorizedException('Invalid credentials');
    // }
    
    // const { password: _, ...userWithoutPassword } = user;
    
    // const accessToken = await this.jwtService.signAsync({
    //   sub: user.id,
    //   username: user.username,
    //   // role: user.role,
    // });

    // return {
    //   message: 'Login successful',
    //   data: {
    //     ...userWithoutPassword,
    //     accessToken,
    //   },
    // };
  }

  async signup(dto: RegisterDto) {
    const existing = await this.usersService.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use .');
    }
    const hashedPassword = this.hashPassword(dto.password);
    const newUser: RegisterDto = {
      ...dto,
      password: hashedPassword,
    };
    return await this.usersService.create(newUser);
  }
  
  hashPassword(password: string) {    
    return bcrypt.hashSync(password, 10);
  }
  
  async verifyPassword(
    user: User,
    password: string,
    hashedPassword: string
  ) {
    return user && (await bcrypt.compare(
      password, hashedPassword
    ));
  }

  private async generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: (this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m')  as SignOptions['expiresIn'],
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as SignOptions['expiresIn'],
    });

    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.usersService.setRefreshTokenHash(userId, refreshTokenHash);

    return { accessToken, refreshToken };
  }
}
