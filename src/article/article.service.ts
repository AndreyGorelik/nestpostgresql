import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/createArticle.dto';
import { ArticleEntity } from './entities/article.entity';
import { User } from '@app/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import {
  ArticleResponseInterface,
  ArticlesResponseInterface,
} from './article.types';
import slugify from 'slugify';
import { UpdateArticleDto } from './dto/updateArticle.dto';
import dataSource from 'db/data-source';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepositary: Repository<ArticleEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async updateArticle(
    currentUserId: number,
    slug: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepositary.findOne({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException("Article doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException(
        "It's not ur article, huh!",
        HttpStatus.FORBIDDEN,
      );
    }

    Object.assign(article, updateArticleDto);

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

  async deleteArticleBySlug(
    currentUserId: number,
    slug: string,
  ): Promise<DeleteResult> {
    const article = await this.articleRepositary.findOne({
      where: {
        slug,
      },
    });

    if (!article) {
      throw new HttpException("Article doesn't exist", HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException("It's not ur article, huh", HttpStatus.FORBIDDEN);
    }

    return await this.articleRepositary.delete({ slug });
  }

  async findArticles(
    currentUserId: number,
    query: any,
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = dataSource
      .getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    queryBuilder.orderBy('articles.createdAt', 'ASC');

    const articlesCount = await queryBuilder.getCount();

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    if (query.favorited) {
      const author = await this.userRepository.findOne({
        where: {
          name: query.favorited,
        },
        relations: {
          favorites: true,
        },
      });

      const ids = author.favorites.map((item) => item.id);
      if (ids.length > 0) {
        queryBuilder.andWhere('articles.authorId IN(:...ids)', { ids });
      } else {
        queryBuilder.andWhere('1=0');
      }
    }

    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}`,
      });
    }

    if (query.author) {
      const author = await this.userRepository.findOne({
        where: {
          name: query.author,
        },
      });

      queryBuilder.andWhere('articles.authorId = :id', {
        id: author.id,
      });
    }

    const articles = await queryBuilder.getMany();
    return { articles, articlesCount };
  }

  async addArticleToFavorites(
    id: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepositary.findOne({
      where: {
        slug,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        favorites: true,
      },
    });

    const isNotFavorited =
      user.favorites.findIndex((item) => item.id === article.id) === -1;

    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoritesCount += 1;
      await this.userRepository.save(user);
      await this.articleRepositary.save(article);
    }

    return article;
  }

  async deleteArticleFromFavorites(
    id: number,
    slug: string,
  ): Promise<ArticleEntity> {
    const article = await this.articleRepositary.findOne({
      where: {
        slug,
      },
    });

    const user = await this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        favorites: true,
      },
    });

    const articleIndex = user.favorites.findIndex(
      (item) => item.id === article.id,
    );

    if (articleIndex >= 0) {
      user.favorites.splice(articleIndex, 1);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepositary.save(article);
    }

    return article;
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) + '-' + new Date().getTime().toString()
    );
  }
}
