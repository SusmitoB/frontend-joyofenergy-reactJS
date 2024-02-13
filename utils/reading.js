export const getReadings = async (length = 1200) => {
  const current = Date.now();
  const hour = 1000 * 60 * 60;
  return [...new Array(length)].map((_, index) => ({
    time: current - index * hour,
    value: Math.random() * 0.7 + 0.4,
  }));
};

const diffBetweenDates = (dt1, dt2) => {
  let diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

export const groupByDay = (readings, currentTime) => {
  const groupedByDay = readings.reduce((curr, { time, value }) => {
    const readingDate = new Date(time);
    const day = new Date(
      readingDate.getFullYear(),
      readingDate.getMonth(),
      readingDate.getDate()
    ).getTime();
    if (!curr[day]) curr[day] = 0;
    curr[day] += value;
    return curr;
  }, {});

  // const groupedByHour = readings.reduce((curr, { time, value }) => {
  //   const diff = diffBetweenDates(new Date(time), new Date(currentTime));
  //   const readingDate = new Date(time);
  //   const day = new Date(
  //     readingDate.getFullYear(),
  //     readingDate.getMonth(),
  //     readingDate.getDate(),
  //   ).getTime();
  //   if (diff <= 24) {
  //     if (!curr[day]) curr[day] = 0;
  //     curr[day] += value;
  //   }
  //   return curr;
  // }, {});

  return Object.entries(groupedByDay).map(([day, value]) => ({
    time: Number(day),
    value,
  }));
};

export const sortByTime = (readings) => {
  return [...readings].sort(
    (readingA, readingB) => readingA.time - readingB.time
  );
};
