export const addSecondsToAll = (arr: any[], seconds: number) => {
  return arr.map(item => {
    return {
      ...item,
      // Round to 2 decimal places
      startTime: Math.round((item.startTime + seconds) * 100) / 100,
      endTime: Math.round((item.endTime + seconds) * 100) / 100,
    };
  });
};
