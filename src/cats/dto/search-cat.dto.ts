import { IsOptional } from 'class-validator';

export class SearchCatDto {
  @IsOptional()
  nickname?: string;
}
