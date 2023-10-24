import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { SearchCatDto } from './dto/search-cat.dto';

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(Cat) private readonly catRepository: Repository<Cat>,
  ) {}

  async create(createCatDto: CreateCatDto): Promise<Cat> {
    const cat: Cat = new Cat();
    cat.nickname = createCatDto.nickname;
    return await this.catRepository.save(cat);
  }

  async findAll(searchCatDto: SearchCatDto) {
    if (searchCatDto && searchCatDto.nickname) {
      return await this.catRepository.find({
        where: {
          nickname: searchCatDto.nickname,
        },
      });
    } else {
      return await this.catRepository.find();
    }
  }
}
