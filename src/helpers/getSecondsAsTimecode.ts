import { intervalToDuration, formatDuration } from 'date-fns';

const zeroPad = (num: number) => String(num).padStart(2, '0');

export const getSecondsAsTimecode = (seconds: number): string => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 });

  const timecode = formatDuration(duration, {
    format: ['hours', 'minutes', 'seconds'],
    zero: true,
    delimiter: ':',
    locale: {
      formatDistance: (_token, count) => zeroPad(count),
    },
  });

  const decimals = parseFloat((seconds % 1).toFixed(2))
    .toFixed(2)
    .substring(1);

  return timecode + decimals;
};
