import {IsString,IsNumber,IsNotEmpty,IsArray,Min, IsOptional, Matches} from 'class-validator';

export class CreateSellDto {
    @IsNotEmpty({ message: 'Operation name is required'})
    @IsString({ message: 'Operation name must be a string'})
    @Matches(/^[A-Za-z]+(?:\s[A-Za-z]+)*$/, {message: "Your name must be valid name"})
    operationName: string;

    @IsNotEmpty({ message: 'Total amount is required' })
    @IsNumber({ maxDecimalPlaces: 2 }, { message: 'Total amount must be a number with max 2 decimal places' })
    @Min(0, { message: 'Total amount must be a positive number'})
    totalAmount: number;

    @IsNotEmpty({ message: 'Quantity is required'})
    @IsNumber({}, { message: 'Quantity must be a number'})
    @Min(1, { message: 'Quantity must be at least 1'})
    quantity: number;

    @IsNotEmpty({ message: 'User ID is required'})
    @IsNumber({}, { message: 'User ID must be a number'})
    userId: number;

    @IsNotEmpty({ message: 'Products are required'})
    @IsArray({ message: 'Products must be an array'})
    @IsNumber({}, { each: true, message: 'Each product must be a number (product ID)'})
    productIds: number[];
}