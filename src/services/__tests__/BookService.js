import { client as bookServiceClient } from '../BookService';
import { client as networServiceClient } from '../NetworkService';

jest.mock('../NetworkService');

describe('books fetching', () => {
  test('returns empty list if error occurs', async () => {
    networServiceClient.get.mockRejectedValueOnce('random error');

    let ret = bookServiceClient.getBooksByType('');
    expect(ret).toBeInstanceOf(Promise);

    expect(ret).rejects.toEqual('random error');
  });

  test('returns empty list if no volume is specified', async () => {
    networServiceClient.get.mockResolvedValueOnce({ data: [] });

    let ret = bookServiceClient.getBooksByType('');
    expect(ret).toBeInstanceOf(Promise);

    let books = await ret;
    expect(books).toBeInstanceOf(Array);
    expect(books.length).toBe(0);
  });
});

describe('book API response', () => {
  test('converts to Book', async () => {
    const resp = {
      id: 'test',
      volumeInfo: {
        imageLinks: { smallThumbnail: 'test' },
        authors: ['test'],
        description: 'test',
        publishedDate: '1990',
        publisher: 'test',
        title: 'test',
      },
    };

    networServiceClient.get.mockResolvedValueOnce({ data: { items: [resp] } });

    let ret = bookServiceClient.getBooksByType('asd');
    expect(ret).toBeInstanceOf(Promise);

    let books = await ret;
    expect(books).toBeInstanceOf(Array);
    expect(books.length).toBe(1);

    const book = books[0];
    const objKeys = [
      'id',
      'image',
      'title',
      'authors',
      'publisher',
      'published',
      'description',
    ];
    objKeys.forEach(k => {
      expect(book[k]).toBeTruthy();
      if (k === 'authors') {
        expect(book[k]).toBeInstanceOf(Array);
      } else if (k === 'published') {
        expect(book[k]).toBe('1990');
      } else {
        expect(book[k]).toBe('test');
      }
    });
  });
});
