import { client as networkServiceClient } from './NetworkService';
import { client as reportServiceClient } from './ReportingService';
import { Book } from '../types';

interface BookAPIResponse {
  id: string;
  volumeInfo: {
    imageLinks?: { smallThumbnail?: string };
    title?: string;
    authors?: string[];
    publisher?: string;
    publishedDate?: string;
    description?: string;
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
    authors: volumeInfo.authors || ['unknown author'],
    description: volumeInfo.description || 'no description',
    published: volumeInfo.publishedDate || 'unknown publish date',
    publisher: volumeInfo.publisher || 'unknown publisher',
    title: volumeInfo.title || 'unknown title',
    wishlisted: false,
  }));
}

class BookService {
  url = '/books/v1/volumes';
  async getBooksByType(type: string): Promise<Book[]> {
    if (type.length === 0) {
      return [];
    }
    try {
      const { data } = (await networkServiceClient.get(
        this.url + `?q=${type}`,
      )) as BookListAPIResponse;
      return fromAPI(data.items || []);
    } catch (e) {
      reportServiceClient.logError(e.toString());
      console.error('error', e);
      throw e;
    }
  }
}

const client = new BookService();

export { client };
