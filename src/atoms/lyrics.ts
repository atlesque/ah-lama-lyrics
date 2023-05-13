import { atomWithStorage } from 'jotai/utils';
import { LyricsLine } from '../types/lyrics';
import { atom } from 'jotai';

export const lyricsLinesAtom = atomWithStorage<LyricsLine[]>('lyricsLines', []);

export const activeLyricsLineIndexAtom = atomWithStorage<number | undefined>(
  'activeLyricsLineIndex',
  undefined
);

export const activeLyricsLineAtom = atom<LyricsLine | undefined>(get => {
  const lyricsLines = get(lyricsLinesAtom);
  const activeLineIndex = get(activeLyricsLineIndexAtom);
  return activeLineIndex !== undefined ? lyricsLines[activeLineIndex] : undefined;
});
