import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, BadRequestException, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { jwtValidation } from 'src/utils/jwtValidation';
import { UserRoleGuard } from 'src/auth/guards/user-role.guard';

@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) { }

  @Post()
  @UseGuards(UserRoleGuard)
  async createExpense(@Body() createExpenseDto: CreateExpenseDto, @Req() req) {
    try {
      let token = req.headers['authorization']?.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      let infoUser = jwtValidation(token);
      if (!infoUser) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      await this.expensesService.create(createExpenseDto, infoUser.id)
    } catch (e) {
      console.log("ops creating does't work, please try again ", e)
      if (e instanceof UnauthorizedException) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      throw new BadRequestException("ops smth went wrong")
    }
  }

  @Get()
  findAll(@Req() req) {
    try {
      let token = req.headers['authorization']?.split(" ")[1];
      if (!token) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      let infoUser = jwtValidation(token);
      if (!infoUser) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      return this.expensesService.findAllMyExpenses(infoUser.id);
    } catch (e) {
      if (e instanceof UnauthorizedException) {
        throw new UnauthorizedException("ops kidly try to login again")
      }
      if (e instanceof NotFoundException) {
        throw new NotFoundException("No expenses yet")
      }
      throw new BadRequestException("ops smth bad happend")
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expensesService.findOneExpense(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.updateExpense(+id, updateExpenseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expensesService.removeExpense(+id);
  }
}
