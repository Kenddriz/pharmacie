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
import { SaveArticleInput } from './types/article.input';
import { ArticlePagination } from './types/article.dto';
import { uniqId } from '../shared/id-builder.service';
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
    @Args('input') input: PaginationInput,
  ): Promise<ArticlePagination> {
    return await this.articleService.paginate(input);
  }

  @Mutation(() => Article)
  removeArticle(@Args('id', { type: () => Int }) id: number) {
    return this.articleService.remove(id);
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
}
