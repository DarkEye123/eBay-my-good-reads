import { client as networkServiceClient } from './NetworkService';

export interface Book {
  id: string;
  image: string;
  title: string;
  authors: string[];
  publisher: string;
  published: string;
  description: string;
}

interface BookAPIResponse {
  id: string;
  volumeInfo: {
    imageLinks: { smallThumbnail: string };
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
  };
}

interface BookListAPIResponse {
  data: {
    items: BookAPIResponse[];
    totalItems: number;
  };
}

function fromAPI(responses: BookAPIResponse[]): Book[] {
  return responses.map(({ id, volumeInfo }) => ({
    id,
    image: `${
      volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail : ''
    }`,
    authors: volumeInfo.authors,
    description: volumeInfo.description,
    published: volumeInfo.publishedDate,
    publisher: volumeInfo.publisher,
    title: volumeInfo.title,
  }));
}

class BookService {
  url = '/books/v1/volumes';
  async getBooksByType(type: string): Promise<Book[]> {
    try {
      const { data } = (await networkServiceClient.get(
        this.url + `?q=${type}`,
      )) as BookListAPIResponse;
      console.log(data.items);
      return fromAPI(data.items || []);
    } catch (e) {
      // TODO error
      // 429 too many requests
      // 400
      console.error('error', e);
      throw e;
    }
  }
}

const client = new BookService();

export { client };
