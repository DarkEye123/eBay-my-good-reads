import localforage from 'localforage';
import { Book } from '../types';

interface Serializable {
  id: string;
}

export interface StorageService<T extends Serializable> {
  persist: (item: T) => void;
  load: (key: string) => Promise<T | null>;
  loadAll: () => Promise<Array<T | null>>;
  remove: (key: string) => Promise<T | null>;
}

class BookStorageService<T extends Book> implements StorageService<T> {
  constructor() {
    localforage.config({
      name: 'my-good-reads',
      storeName: 'eBay_forage',
    });
  }

  async persist(item: Book) {
    localforage.setItem(item.id, item);
  }

  async load(key: string) {
    return await localforage.getItem<T>(key);
  }

  async loadAll(): Promise<Array<T | null>> {
    const keys = await localforage.keys();
    return await Promise.all(keys.map(k => localforage.getItem<T>(k)));
  }

  async remove(key: string) {
    const ret = await this.load(key);
    await localforage.removeItem(key);
    return ret;
  }
}

const client = new BookStorageService();

export { client };
