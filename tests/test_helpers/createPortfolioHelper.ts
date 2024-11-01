import faker from 'faker';
import { DeepPartial, getRepository } from 'typeorm';
import PortfolioEntity from '../../src/entities/PortfolioEntity';
import buildPageEntity from './createPageHelper';

export function buildPortfolioEntity(versionType: string, properties?: DeepPartial<PortfolioEntity>) {
  const repository = getRepository(PortfolioEntity);
  return repository.create({
    name: faker.name.findName(),
    url: faker.internet.url(),
    version: versionType,
    ...properties,
  });
}

async function createPortfolioEntity(pages: any[], versionType: string, properties?: DeepPartial<PortfolioEntity>) {
  const repository = getRepository(PortfolioEntity);
  const portofolio = buildPortfolioEntity(versionType, properties);
  const pageEntities = await Promise.all(pages.map(async (page) => {
    const pageEntity = buildPageEntity(page, portofolio);
    return pageEntity;
 }));
 portofolio.pages = pageEntities;
 const port = await repository.save(portofolio);
  return port;
}

export default createPortfolioEntity;
