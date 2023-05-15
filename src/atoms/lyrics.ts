import { atomWithStorage } from 'jotai/utils';
import { LyricsLine } from '../types/lyrics';
import { atom } from 'jotai';
import { sortBy } from 'lodash';

const lyricsLinesAtomLocalStorage = atomWithStorage<LyricsLine[]>('lyricsLines', []);

export const lyricsLinesAtom = atom(
  get => get(lyricsLinesAtomLocalStorage),
  (_get, set, newLyricsLines: LyricsLine[]) => {
    set(lyricsLinesAtomLocalStorage, sortBy(newLyricsLines, [line => line.startTime]));
  }
);

export const activeLyricsLineIndexAtom = atomWithStorage<number | undefined>(
  'activeLyricsLineIndex',
  undefined
);

export const activeLyricsLineAtom = atom<LyricsLine | undefined>(get => {
  const lyricsLines = get(lyricsLinesAtom);
  const activeLineIndex = get(activeLyricsLineIndexAtom);
  return activeLineIndex !== undefined ? lyricsLines[activeLineIndex] : undefined;
});
