import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  storeId: number;

  @IsString()
  @IsNotEmpty()
  restaurantId: string;
}
