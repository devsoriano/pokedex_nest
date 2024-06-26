import { IsInt, IsPositive, IsString, Min, MinLength } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  no: number;

  @IsString({ message: `The name of pokemon must be creative` })
  @MinLength(1)
  name: string;
}
