import { z } from 'zod';
import { zoxios } from 'zoxios';
import { zoxiosNock } from './index';
import nock from 'nock';

const beforeEachBlock = () => {
  nock.cleanAll();
};
describe('zoxsio-nock', () => {
  beforeEach(beforeEachBlock);

  const requestMaker = zoxios('http://google.com')
    .concatPath('api')
    .responseSchema(
      z.object({ name: z.string(), age: z.number().min(0).max(120) }),
    );

  describe('when provided a GET request', () => {
    const getRequestMaker = requestMaker.method('get');

    it('should return GET scope', async () => {
      const scope = zoxiosNock(getRequestMaker);
      const response = await getRequestMaker.exec();

      expect(response).not.toBeUndefined();
      expect(response).toMatchObject({
        name: expect.any(String),
        age: expect.any(Number),
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('when provided a POST request', () => {
    const postRequestMaker = requestMaker.method('post');

    it('should return POST scope', async () => {
      const scope = zoxiosNock(postRequestMaker);
      const response = await postRequestMaker.exec();

      expect(response).not.toBeUndefined();
      expect(response).toMatchObject({
        name: expect.any(String),
        age: expect.any(Number),
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });

  describe('when provided a PUT request', () => {
    const postRequestMaker = requestMaker.method('PUT');

    it('should return PUT scope', async () => {
      const scope = zoxiosNock(postRequestMaker);
      const response = await postRequestMaker.exec();

      expect(response).not.toBeUndefined();
      expect(response).toMatchObject({
        name: expect.any(String),
        age: expect.any(Number),
      });
      expect(scope.isDone()).toBeTruthy();
    });
  });
});
