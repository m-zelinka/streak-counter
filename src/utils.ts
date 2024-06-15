export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US");
}

export function differenceInDays(dateLeft: Date, dateRight: Date) {
  const differenceInTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
}
