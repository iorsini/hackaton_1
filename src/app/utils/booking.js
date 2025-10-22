const getAvailableDates = (unavailableDates) => {
  const allDates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date.toISOString().split('T')[0];
  });

  const availableDates = allDates.filter(date => !unavailableDates.includes(date));
  return availableDates;
};
module.exports = { getAvailableDates };