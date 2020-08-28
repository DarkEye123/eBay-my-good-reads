import { client } from '../NetworkService';

test('it creates network client', () => {
  expect(client).toBeInstanceOf(Object);
  expect(client).toHaveProperty('defaults.baseURL');
  expect(client).toHaveProperty('defaults.headers');
});
