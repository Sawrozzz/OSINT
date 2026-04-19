import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const NEPAL_TZ = "Asia/Kathmandu";

export const formatToNepalTime = (
  date: string | number | Date | dayjs.Dayjs | null | undefined, 
  format = "DD MMM YYYY, hh:mm A"
) => {
  if (!date) return "";
  return dayjs.utc(date).tz(NEPAL_TZ).format(format);
};