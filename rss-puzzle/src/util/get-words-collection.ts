import { IWordCollection } from '../interfaces/IWordCollection';

export default async function getWordsCollection(
  level: number,
): Promise<IWordCollection> {
  const result: IWordCollection = await fetch(
    `https://raw.githubusercontent.com/rolling-scopes-school/rss-puzzle-data/main/data/wordCollectionLevel${level}.json`,
  )
    .then((response) => response.json())
    .then((json) => json)
    .catch((err) => new Error(err));

  return result;
}
