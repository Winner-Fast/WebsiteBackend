import { Controller, Post, Body, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dtos/auth/create-register.dto';
import { SignInDto } from './dtos/auth/create-login.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: SignInDto) {
    try{
      return await this.authService.login(loginDto)
    }catch(e){
      throw new BadRequestException("Hola ops smth went wrong")
    }
  }

  // @Post('profile')
  // getProfile(@Request() req) {
  //   return req.user; // req.user contains the user information decoded from JWT
  // }

  @Post('register')
  async register(@Body() registerDto: SignupDto) {
    return await this.authService.register(registerDto);
  }
}
