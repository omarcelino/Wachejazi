export const DELIVERY_FEE = 300;
export const FREE_DELIVERY_THRESHOLD = 12000;

export function getArrivalLabel(daysFromNow = 2): string {
  const arrival = new Date();
  arrival.setDate(arrival.getDate() + daysFromNow);
  return arrival.toLocaleDateString("en-KE", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}
