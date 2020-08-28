import BookService from '../BookService';
import { client } from '../NetworkService';

jest.mock('../NetworkService');

let service;

beforeAll(() => {
  service = new BookService();
});

test('returns empty list if error occurs', async () => {
  client.get.mockRejectedValueOnce(new Error('random error'));

  let ret = service.getBooksByType('');
  expect(ret).toBeInstanceOf(Promise);

  ret = await ret;
  expect(ret).toHaveProperty('books');
  expect(ret.books).toBeInstanceOf(Array);
  expect(ret.books.length).toBe(0);
});

test('returns empty list if no volume is specified', async () => {
  client.get.mockResolvedValueOnce([]);

  let ret = service.getBooksByType('');
  expect(ret).toBeInstanceOf(Promise);

  ret = await ret;
  expect(ret).toHaveProperty('books');
  expect(ret.books).toBeInstanceOf(Array);
  expect(ret.books.length).toBe(0);
});
