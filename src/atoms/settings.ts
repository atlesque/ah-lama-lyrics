import { atomWithStorage } from 'jotai/utils';
import { atom } from 'jotai';
import { Settings } from '../types/settings';
import { DEFAULT_SLIDE_TIME } from '../constants';

export const showSettingsModalAtom = atom<boolean>(false);

export const settingsAtom = atomWithStorage<Settings>('settings', {
  autoFollowLyricsList: false,
  showTibetan: false,
  presentationZoomLevel: 1.7,
  showPresentationControls: false,
  showImageInput: false,
  intro: {
    title: '',
    subtitle: '',
    time: DEFAULT_SLIDE_TIME,
  },
  outro: {
    title: '',
    subtitle: '',
    time: DEFAULT_SLIDE_TIME,
  },
});
