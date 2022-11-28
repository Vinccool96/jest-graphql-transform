import loader from "graphql-tag"
import {SyncTransformer, TransformOptions} from "@jest/transform"



const graphqlTransformer: SyncTransformer = {
  // @ts-ignore
  process(sourceText: string, sourcePath: string, options: TransformOptions) {
    const commentLines = sourceText.split(/\n/)
    const importLines = commentLines.filter(s => /^# ?import "[^"]+"$/g.test(s))

    const result = loader.call({ cacheable() {} }, sourceText)
    return loader.call({ cacheable() {} }, sourceText)
  },
}

export default graphqlTransformer
