
<p align="center">
  <h1 align="center">ZoXios Nock</h1>
  <p align="center">
    A testing package that returns a nock scope when provided a zoxios request-maker.
  </p>
</p>


## Features
   * Provide a mock for zoxios http request definitions.

## installation

### Install peer dependencies

```bash
npm i zoxios axios zod
```

### Install zoxios
```bash
npm i zoxios-nock
```

## Basic usage

Parsing request's query and response's body.

```typescript
import { zoxios } from 'zoxios';
import { zoxiosNock } from 'zoxios-nock';

describe('when provided a GET request', () => {
const requestMaker = zoxios('http://google.com')
    .method('get')
    .concatPath('api')
    .responseSchema(
      z.object({ name: z.string(), age: z.number().min(0).max(120) }),
    );

    it('should return GET scope', async () => {
        // Providing zoxiosNock a requestMaker from zoxios.
        const scope = zoxiosNock(getRequestMaker);
        const response = await getRequestMaker.exec();

        expect(response).toMatchObject({
            name: expect.any(String),
            age: expect.any(Number),
        });
        expect(scope.isDone()).toBeTruthy();
    });
});

```
