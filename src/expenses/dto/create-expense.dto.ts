import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength, MaxLength, IsDate } from 'class-validator';

export class CreateExpenseDto {
    @IsString({message:"The operation name must be string"})
    @MaxLength(255, { message: "The operation name should" })
    operationName: string;

    @IsNotEmpty({ message: "The expense type is required" })
    @IsEnum(['fixed', 'variable'], { message: "Type must be either 'fixed' or 'variable'" })
    type: 'fixed' | 'variable'; 

    @IsNotEmpty({ message: "Amount is required" })
    @IsNumber({}, { message: "Amount must be a number" })
    amount: number;

    @IsNotEmpty({ message: "Date is required" })
    date: string;

    @IsOptional()
    @IsString()
    @MaxLength(255, { message: "Description cannot exceed 255 characters" })
    description?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255, { message: "Category cannot exceed 255 characters" })
    category?: string;


    // @IsNotEmpty({ message: "User ID is required" })
    // @IsNumber()
    @IsOptional()
    userId: number;



}
