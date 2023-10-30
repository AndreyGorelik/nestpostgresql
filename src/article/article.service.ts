import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './entities/article.entity';
import { User } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleResponseInterface } from './article.types';
import slugify from 'slugify';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepositary: Repository<ArticleEntity>,
  ) {}

  async createArticle(
    currentUser: User,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);
    article.author = currentUser;

    return await this.articleRepositary.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  async getArticleBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepositary.findOne({
      where: {
        slug,
      },
    });
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) + '-' + new Date().getTime().toString()
    );
  }
}
