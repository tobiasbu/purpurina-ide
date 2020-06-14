import * as path from 'path';

type NamedEntries = string[];
interface EntryPathOptions {
  HOT_MW?: string;
  PROJECT_PATH: string;
  subDir?: string;
}

export default function getEntry<T extends NamedEntries>(
  config: EntryPathOptions,
  entries: T
) {
  // entry path
  const ENTRY_PATH = path.join(
    config.PROJECT_PATH,
    `./src/${config.subDir ?? ''}`
  );
  let namedEntries: { [indexer: string]: string | string[] } = {};
  let entriesDir: { [indexer: string]: string } = {};

  for (let i = 0; i < entries.length; i += 1) {
    let entryName = entries[i];
    let dir: string;
    let entryFilepath: string;
    const parsed = path.parse(entryName);
    const ext = parsed.ext;
    if (!!ext) {
      dir = ENTRY_PATH;
      entryFilepath = path.join(dir, `/${entryName}`);
      entryName = parsed.name;
    } else {
      dir = path.join(ENTRY_PATH, `/${entryName}`);
      entryFilepath = path.join(dir, '/index.ts');
    }
    namedEntries[entryName] = config.HOT_MW
      ? [config.HOT_MW, entryFilepath]
      : entryFilepath;
    entriesDir[entryName] = dir;
  }

  return {
    ENTRY_PATH,
    entry: namedEntries,
    dir: entriesDir,
  };
}
