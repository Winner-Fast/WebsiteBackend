
import { PartialType } from "@nestjs/mapped-types";
import { CreateSellDto } from "./create-sell.dto";
export class UpdateExpenseDto extends PartialType(CreateSellDto) {}
