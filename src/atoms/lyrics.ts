import { atomWithStorage } from 'jotai/utils';
import { LyricsLine } from '../types/lyrics';

export const lyricsLinesAtom = atomWithStorage<LyricsLine[]>('lyricsLines', []);
