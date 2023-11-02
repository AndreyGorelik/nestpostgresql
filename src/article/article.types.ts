import { ArticleEntity } from './entities/article.entity';

export interface ArticleResponseInterface {
  article: ArticleEntity;
}

export interface ArticlesResponseInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}
