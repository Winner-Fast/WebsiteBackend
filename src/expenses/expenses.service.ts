import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>
  ){}
  async create(createExpenseDto: CreateExpenseDto, userId) {
    try{
      createExpenseDto.userId = userId;
      let result = this.expenseRepository.create(createExpenseDto)
      const expense = this.expenseRepository.create({
        ...createExpenseDto,
        date: new Date(createExpenseDto.date),
      });
      const finalResult = await this.expenseRepository.save(expense);
      if(!finalResult){
        throw new BadRequestException("ops smth went wrong")
      }
      console.log(finalResult)
      return finalResult
    }catch(e){
      throw new BadRequestException("ops smth went wrong")
    }
  }

  async findAllMyExpenses(userId) {
    try{
     let result =await  this.expenseRepository.find({where:{userId}});
    //  console.log(result);
    if(!result || result.length == 0){
      throw new NotFoundException("No expenses yet")
     }
     return result
    }catch(e){
      // console.log("eeee", e)
      if(e instanceof NotFoundException){
        throw new NotFoundException("No expenses yet")
      }
      throw new BadRequestException("Ops smth went wrong")
    }
  }

  findOneExpense(id) {
    return this.expenseRepository.findOne({
      where: { id },
    });
  }

  updateExpense(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  removeExpense(id: number) {
    return `This action removes a #${id} expense`;
  }
}
