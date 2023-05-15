import { atomWithStorage } from 'jotai/utils';
import { LyricsLine } from '../types/lyrics';
import { atom } from 'jotai';
import { sortBy } from 'lodash';
import { currentTimeAtom } from './audio';

const lyricsLinesAtomLocalStorage = atomWithStorage<LyricsLine[]>('lyricsLines', []);

export const lyricsLinesAtom = atom(
  get => get(lyricsLinesAtomLocalStorage),
  (_get, set, newLyricsLines: LyricsLine[]) => {
    set(lyricsLinesAtomLocalStorage, sortBy(newLyricsLines, [line => line.startTime]));
  }
);

export const selectedLyricsLineIndexAtom = atomWithStorage<number | undefined>(
  'selectedLyricsLineIndex',
  undefined
);

export const selectedLyricsLineAtom = atom<LyricsLine | undefined>(get => {
  const lyricsLines = get(lyricsLinesAtom);
  const activeLineIndex = get(selectedLyricsLineIndexAtom);
  return activeLineIndex !== undefined ? lyricsLines[activeLineIndex] : undefined;
});

export const currentLyricsLineAtom = atom<LyricsLine | undefined>(get => {
  const lyricsLines = get(lyricsLinesAtom);
  const currentTime = get(currentTimeAtom);
  const currentLineCandidates = lyricsLines.filter(
    line => line.startTime <= currentTime && line.endTime > currentTime
  );
  return currentLineCandidates.length > 0 ? currentLineCandidates[0] : undefined;
});
