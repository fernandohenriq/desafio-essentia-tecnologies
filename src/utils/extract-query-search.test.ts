import { extractQuerySearch } from './extract-query-search';

describe('Extract Search', () => {
  test('Should be able to extract search from a query object', async () => {
    const query = {
      page: '1',
      limit: '10',
      orderBy: 'createdAt',
      sort: 'desc',
      where: `{
        "completed": true,
        "year": "2024",
        "day": 10,
        "date": "2024-10-10"
      }`,
      title: 'title',
      age: '18',
    };

    const search = extractQuerySearch(query);

    expect(search.page).toBe(1);
    expect(search.limit).toBe(10);
    expect(search.orderBy).toBe('createdAt');
    expect(search.sort).toBe('desc');
    expect(search.where).toEqual({
      completed: true,
      year: 2024,
      day: 10,
      date: new Date('2024-10-10').toISOString(),
      title: 'title',
      age: 18,
    });
  });
});
