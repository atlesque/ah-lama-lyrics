import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const currentTimeAtom = atomWithStorage<number>('currentTime', 0);

export const lastSetTimeAtom = atomWithStorage<number | undefined>('lastSetTime', 0);

export const audioPlayerRefAtom = atom<HTMLAudioElement | undefined>(undefined);

export const audioPlayerHasEndedAtom = atom(false);
