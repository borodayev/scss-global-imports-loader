import path from 'path';
import { LoaderContext } from 'webpack';

type Options = {
  resources: string[];
};

export default function (this: LoaderContext<Options>, source: string) {
  const callback = this.async();
  const moduleContext = this.context;
  const options = this.getOptions();
  const { resources = [] } = options || {};

  if (resources.length === 0) {
    const error = new Error("Can't find scss resources in your config. Make sure 'options.resources' exists");
    callback(error);
  }

  const importStatements = resources
    .map((resourse) => {
      return `@import '${path.relative(moduleContext, resourse)}';`;
    })
    .join('\n');

  callback(null, `${importStatements}\n${source}`);
  return undefined;
}
