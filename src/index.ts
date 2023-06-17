import type { Method } from 'axios';
import { RequestMaker } from 'zoxios';
import nock from 'nock';
import { generateMock } from '@anatine/zod-mock';

type SupportedNockMethod = Exclude<
  Lowercase<Method>,
  'link' | 'unlink' | 'purge'
>;

function addMethod(
  scope: nock.Scope,
  method: SupportedNockMethod,
  uri: string,
): nock.Interceptor {
  return {
    get: () => scope.get(uri),
    put: () => scope.put(uri),
    post: () => scope.post(uri),
    head: () => scope.head(uri),
    patch: () => scope.patch(uri),
    delete: () => scope.delete(uri),
    options: () => scope.options(uri),
  }[method]();
}

export function zoxiosNock(requestMaker: RequestMaker): nock.Scope {
  const { hostname, path, method, responseSchema } =
    requestMaker.getDefinition();

  if (!method) throw new Error('[zoxios-nock] - method is missing');

  const lowerCaseMethod = method.toLocaleLowerCase() as Lowercase<Method>;

  const response = responseSchema
    ? generateMock(responseSchema) || undefined
    : undefined;

  const scope = nock(hostname);
  const interceptor = addMethod(
    scope,
    lowerCaseMethod as SupportedNockMethod,
    path,
  );

  return interceptor.reply(200, response);
}
