import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { Settings } from '../types/settings';

export const showSettingsModalAtom = atom<boolean>(false);

export const settingsAtom = atomWithStorage<Settings>('settings', {
  autoFollowLyricsList: false,
  showTibetan: false,
  presentationZoomLevel: 1.5,
  showPresentationControls: false,
  showImageInput: false,
});
