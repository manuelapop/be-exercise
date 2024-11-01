import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { getRepository } from 'typeorm';

import PortfolioEntity from '../entities/PortfolioEntity';
import { buildPortfolioEntity } from '../../tests/test_helpers/createPortfolioHelper';
import buildPageEntity from '../../tests/test_helpers/createPageHelper';


@InputType()
export class Page {
  @Field(() => String)
  name: string;

  @Field(() => String)
  url: string;
}

@Resolver()
@Service()
export default class ListPortfoliosResolver {
  @Query(() => [PortfolioEntity],{ description: 'List all portfolios' })
  async listPortfolios(): Promise<PortfolioEntity[]> {
    const portfolioRepository = getRepository(PortfolioEntity);

    return portfolioRepository
      .createQueryBuilder('p')
      .getMany();
  }

  @Query(() => [PortfolioEntity],{ description: 'List all portfolios' })
  async listPortfoliosByVersionType(@Arg("version", { nullable: true }) version?: string,): Promise<PortfolioEntity[]> {
    const portfolioRepository = getRepository(PortfolioEntity);

    const qb = portfolioRepository
    .createQueryBuilder('portofolio');

      qb.andWhere("portofolio.version = :version", { version: version });

    return qb.getMany();
  }

  @Mutation(() => PortfolioEntity,{ description: 'create portfolios' })
  async createPortofolio(
    @Arg("versionType",{ nullable: true }) versionType: string,
    @Arg("pages", type => [Page],{ nullable: true }) pages: Page[]
  ): Promise<PortfolioEntity> {
    console.log(versionType);
    console.log(pages);
    const repository = getRepository(PortfolioEntity);
    const portofolio = buildPortfolioEntity(versionType);
    const pageEntities = await Promise.all(pages.map(async (page) => {
      const pageEntity = buildPageEntity(page, portofolio);
      return pageEntity;
   }));
   portofolio.pages = pageEntities;
   const port = await repository.save(portofolio);
    return port;
  }
}
