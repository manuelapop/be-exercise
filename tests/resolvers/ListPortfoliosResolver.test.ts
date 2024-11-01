import { getRepository } from 'typeorm';
import { PortofolioVersion } from '../../src/entities/PortofolioVersion';
import createApolloServer from '../test_helpers/createApolloServer';
import createPortfolioEntity from '../test_helpers/createPortfolioHelper';
import faker from 'faker';
import PortfolioEntity from '../../src/entities/PortfolioEntity';
import PageEntity from '../../src/entities/PageEntity';

describe('ListPortfoliosResolver', () => {
  const QUERY = `
    query ListPortfolios {
      listPortfolios {
        id
        name
        url
        version
      }
    }
  `;

  const QueryVersion =`
  query ListPortfoliosByVersionType($version: String){
    listPortfoliosByVersionType(version: $version){
      id
      name
      url
      version
      }
  }
  `;

  const createPortofolio =`
  mutation CreatePortofolio($versionType: String, $pages: [Page!]){
    createPortofolio(versionType: $versionType, pages: $pages){
      id
      name
      url
      version
      }
  }
  `;

  let pages =  
  [{url: faker.internet.url(), name: faker.name.findName()}, 
    {url: faker.internet.url(), name: faker.name.findName()}];

    afterEach(() => {
      const portofolioRepository = getRepository(PortfolioEntity);
      portofolioRepository.clear();
      const pageRepository = getRepository(PageEntity);
      pageRepository.clear();
    });

  test('return 3 items', async () => {
    const portfolio1 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const portfolio2 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const portfolio3 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QUERY,
      variables: {},
    });
    expect(response).toGraphQLResponseData({
      listPortfolios: [
        {
          id: portfolio1.id,
          name: portfolio1.name,
          url: portfolio1.url,
          version: PortofolioVersion.DRAFT,
        },
        {
          id: portfolio2.id,
          name: portfolio2.name,
          url: portfolio2.url,
          version: PortofolioVersion.DRAFT,
        },
        {
          id: portfolio3.id,
          name: portfolio3.name,
          url: portfolio3.url,
          version: PortofolioVersion.DRAFT,
        },
      ],
    });
  });

  test('return 3 items version draft', async () => {
    const p1 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const p2 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const p3 = await createPortfolioEntity(pages, PortofolioVersion.DRAFT);
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QueryVersion,
      variables: {version: 'draft'},
    });
    expect(response).toGraphQLResponseData({
      listPortfoliosByVersionType: [
        {
          id: p1.id,
          name: p1.name,
          url: p1.url,
          version: PortofolioVersion.DRAFT,
        },
        {
          id: p2.id,
          name: p2.name,
          url: p2.url,
          version: PortofolioVersion.DRAFT,
        },
        {
          id: p3.id,
          name: p3.name,
          url: p3.url,
          version: PortofolioVersion.DRAFT,
        },
      ],
    });
  });

  test('return 2 items version published', async () => {
    const portfolio1 = await createPortfolioEntity(pages, PortofolioVersion.PUBLISHED);
    const portfolio2 = await createPortfolioEntity(pages, PortofolioVersion.PUBLISHED);
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QueryVersion,
      variables: {version: 'published'},
    });
    expect(response).toGraphQLResponseData({
      listPortfoliosByVersionType: [
        {
          id: portfolio1.id,
          name: portfolio1.name,
          url: portfolio1.url,
          version: PortofolioVersion.PUBLISHED,
        },
        {
          id: portfolio2.id,
          name: portfolio2.name,
          url: portfolio2.url,
          version: PortofolioVersion.PUBLISHED,
        },
      ],
    });
  });

  test('return 5 items version snapshot', async () => {
    const portfolio1 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio2 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio3 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio4 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio5 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QueryVersion,
      variables: {version: 'snapshot'},
    });
    expect(response).toGraphQLResponseData({
      listPortfoliosByVersionType: [
        {
          id: portfolio1.id,
          name: portfolio1.name,
          url: portfolio1.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio2.id,
          name: portfolio2.name,
          url: portfolio2.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio3.id,
          name: portfolio3.name,
          url: portfolio3.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio4.id,
          name: portfolio4.name,
          url: portfolio4.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio5.id,
          name: portfolio5.name,
          url: portfolio5.url,
          version: PortofolioVersion.SNAPSHOT,
        },
      ],
    });
  });

  test('return 5 items version snapshot', async () => {
    const portfolio1 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio2 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio3 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio4 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const portfolio5 = await createPortfolioEntity(pages, PortofolioVersion.SNAPSHOT);
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: QueryVersion,
      variables: {version: 'snapshot'},
    });
    expect(response).toGraphQLResponseData({
      listPortfoliosByVersionType: [
        {
          id: portfolio1.id,
          name: portfolio1.name,
          url: portfolio1.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio2.id,
          name: portfolio2.name,
          url: portfolio2.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio3.id,
          name: portfolio3.name,
          url: portfolio3.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio4.id,
          name: portfolio4.name,
          url: portfolio4.url,
          version: PortofolioVersion.SNAPSHOT,
        },
        {
          id: portfolio5.id,
          name: portfolio5.name,
          url: portfolio5.url,
          version: PortofolioVersion.SNAPSHOT,
        },
      ],
    });
  });

  test('test mutation', async () => {
    const server = createApolloServer();
    const response = await server.executeOperation({
      query: createPortofolio,
      variables: {versionType: PortofolioVersion.DRAFT, pages: pages},
    });
    expect(response).toBeTruthy();
});
});
