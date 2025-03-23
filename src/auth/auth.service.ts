import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entity/user';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignupDto } from './dtos/auth/create-register.dto';
import {hashedpassword } from 'src/utils/hashPassword';
import tokenGenerator from "src/utils/tokenGenerator"
import { NotFoundError } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    // private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  // constructor(
  //   private jwtService: JwtService,
  //   private entityManager: EntityManager
  // ) {}



  async login(loginDto) {
    try{
      const existingUser = await this.userRepository.findOne({where:{email:loginDto.email}})
      if(!existingUser){
        throw new NotFoundException("The email is not found, kindly try to register before login")
      }
      
    }catch(e){
      console.log(e)
      throw new BadRequestException("ops try again ")
    }
  }

  async register(registerDto: SignupDto) {
    try{
      const existingUser = await this.userRepository.findOne({ where:{ email: registerDto.email}});
      if(existingUser){
        throw new ConflictException('Email is already registered.');
      }
      let hashpassword = await hashedpassword(registerDto.password);
      if (!hashpassword) {
          return "Verify your password and try again"
      }
      registerDto.password = hashpassword;
      const user = this.userRepository.create(registerDto);
      await this.userRepository.save(user);
      const token = await tokenGenerator(user, 2)

      return {
        user,
        token,
      };

    }catch(e){
      console.log('oppppppppps error ',e)
      if(e instanceof ConflictException){
        throw new ConflictException('Email is already registered.')
      }
      throw new BadRequestException("Ops smth went wrong")
    }
}
}
