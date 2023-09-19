export interface SlideSettings {
  title: string;
  subtitle?: string;
  time: number;
}

export interface Settings {
  showTibetan: boolean;
  autoFollowLyricsList: boolean;
  presentationZoomLevel: number;
  showPresentationControls: boolean;
  showImageInput: boolean;
  intro: SlideSettings;
  outro: SlideSettings;
}
