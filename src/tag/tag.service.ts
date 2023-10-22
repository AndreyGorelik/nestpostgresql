import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private tagsRepository: Repository<TagEntity>,
  ) {}

  findAll(): string[] {
    return ['dragon', 'coffee', 'cola', 'whiskey'];
  }
}
