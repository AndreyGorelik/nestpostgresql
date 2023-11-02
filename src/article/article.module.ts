import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './entities/article.entity';
import { User } from '@app/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, User])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
