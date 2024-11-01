import {getRepository } from 'typeorm';
import PageEntity from '../../src/entities/PageEntity';
import PortfolioEntity from '../../src/entities/PortfolioEntity';


export function buildPageEntity(page: any, portofolio: PortfolioEntity) {
  const repository = getRepository(PageEntity);

  return repository.create({
    name: page.name,
    url: page.url,
    portfolio: portofolio
  });
}

export default buildPageEntity;
