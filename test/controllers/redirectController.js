import { expect } from 'chai';

import { server } from '../../src/app';
import { fakeDb, fakeLink } from '../fakes';

let fakeServer;
/**
 * Unfortunately I did not have enough time to get the text suite operational.
 * Most of the difficulty revolved around faking the server/db combo. But this is
 * is a sample of a test I would have expanded upon given more time.
 */
describe('redirectController', () => {
  beforeEach(() => {
    fakeServer = server(fakeDb);
  })
  describe('when the provided shortUrl is not in the db', () => {
    it('returns an error', async () => {
      const response = await fakeServer.get('/badUrl')
      response.expect(400);
    });
  });
});
