import { client } from './NetworkService';

export interface Book {
  image: string;
  title: string;
  author: string;
  publisher: string;
  published: string;
  description: string;
}

interface BookListAPIResponse {
  books: Book[];
}

export default class BookService {
  url = '/books/v1/volumes';
  async getBooksByType(type: string): Promise<BookListAPIResponse> {
    try {
      const types: Book[] = await client.get(this.url + `?q=${type}`);
      return { books: types };
    } catch (e) {
      // TODO error
      console.error('error');
    }
    return { books: [] };
  }
}
