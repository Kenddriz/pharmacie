import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Root,
} from '@nestjs/graphql';
import { ArticleService } from './article.service';
import { Article } from './article.entity';
import { PaginateArticleInput, SaveArticleInput } from './types/article.input';
import { ArticlePagination } from './types/article.dto';
import { uniqId } from '../utils';
import { PaginationInput } from '../shared/shared.input';
import { Medicine } from '../medicine/medicine.entity';
import { MedicineService } from '../medicine/medicine.service';

@Resolver(() => Article)
export class ArticleResolver {
  constructor(
    private articleService: ArticleService,
    private medicineService: MedicineService,
  ) {}

  @Mutation(() => Article)
  async saveArticle(@Args('input') input: SaveArticleInput) {
    const { id, ...res } = input;
    let article: Article;
    if (id === 0) {
      article = new Article();
      article.id = await uniqId('Article');
    } else {
      article = await this.articleService.findOneById(id);
    }
    Object.assign(article, res);
    return this.articleService.create(article);
  }
  @Query(() => ArticlePagination)
  async paginateArticles(
    @Args('input') input: PaginateArticleInput,
  ): Promise<ArticlePagination> {
    return await this.articleService.paginate(input);
  }
  @Query(() => Article, { nullable: true })
  findOneArticle(
    @Args({ name: 'keyword', type: () => String }) keyword: string,
  ): Promise<Article> {
    return this.articleService.findOne(keyword);
  }
  @Query(() => Int)
  async countArticles() {
    return this.articleService.count();
  }
  @ResolveField(() => [Medicine])
  async medicines(@Root() article: Article): Promise<Medicine[]> {
    return await this.medicineService.findOneByArticle(article.id);
  }
  @Query(() => ArticlePagination)
  async paginateDeletedArticles(
    @Args('input') input: PaginationInput,
  ): Promise<ArticlePagination> {
    return this.articleService.paginateDeleted(input);
  }
  @Mutation(() => Article)
  async softRemoveArticle(@Args({ name: 'id', type: () => Int }) id: number) {
    const article = await this.articleService.findOneById(id);
    return this.articleService.softRemove(article);
  }
  @Mutation(() => Boolean)
  async removeArticle(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.articleService.remove(id);
  }
  @Mutation(() => Article, { nullable: true })
  async restoreArticle(@Args({ name: 'id', type: () => Int }) id: number) {
    await this.articleService.restore(id);
    return this.articleService.findOneById(id);
  }
}
