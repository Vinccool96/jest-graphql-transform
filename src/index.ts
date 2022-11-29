import { resolve } from "path"
import { readFileSync } from "fs"

import loader from "graphql-tag"
import { SyncTransformer } from "@jest/transform"

function indexesOf<E>(
  array: Array<E>,
  predicate: (value: E, index: number, array: Array<E>) => boolean
): Array<number> {
  const indexes: Array<number> = []
  for (let i = 0; i < array.length; i++) {
    const arrayElement = array[i]
    if (predicate(arrayElement, i, array)) {
      indexes.push(i)
    }
  }
  return indexes
}

function doImports(
  sourceLines: Array<string | Array<string>>,
  sourcePath: string,
  loadedFiles: Set<string> = new Set()
): Array<string> {
  if (loadedFiles.has(sourcePath)) {
    return []
  }

  loadedFiles.add(sourcePath)

  const indexesImportLines = indexesOf(sourceLines, (s) => /^# ?import "[^"]+"$/g.test(s as string))

  for (const index of indexesImportLines) {
    const relativeImportPath = (sourceLines[index] as string).split('"')[1]
    const importedFilePath = resolve(sourcePath, "..", relativeImportPath)
    const importedFileLines = readFileSync(importedFilePath, { encoding: "utf8" }).split("\n")
    sourceLines[index] = doImports(importedFileLines, importedFilePath, loadedFiles)
  }

  return sourceLines.flat()
}

const graphqlTransformer: SyncTransformer = {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  process(sourceText: string, sourcePath: string) {
    const sourceLines = sourceText.split("\n")
    const linesWithImport = doImports(sourceLines, sourcePath)
    const foldedLines = linesWithImport.reduce((prev, curr) => `${prev}\n${curr}`)

    return {
      code: loader.call({ cacheable() {} }, foldedLines),
    }
  },
}

export default graphqlTransformer
