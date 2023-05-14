import { atomWithStorage } from 'jotai/utils';

export const currentTimeAtom = atomWithStorage<number>('currentTime', 0);
