import {
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getWeek,
  setMonth,
  setWeek,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";

const locale = ko;

export function today(formatString = "PPP") {
  return format(new Date(), formatString, { locale });
}

export function formatDate(
  date = today("yyyy-MM-dd"),
  formatString = "yyyy-MM-dd"
) {
  return format(new Date(date), formatString);
}

export function getRangeOfMonth(month, formatString) {
  const monthDate = setMonth(new Date(), month);
  const start = formatString
    ? format(startOfMonth(monthDate), formatString)
    : startOfMonth(monthDate);
  const end = format
    ? format(endOfMonth(monthDate), formatString)
    : endOfMonth(monthDate);
  return { start, end };
}

export function getRangeOfWeek(week, formatString) {
  const weekDate = setWeek(new Date(), week);
  const start = formatString
    ? format(startOfWeek(weekDate), formatString)
    : startOfWeek(weekDate);
  const end = formatString
    ? format(endOfWeek(weekDate), formatString)
    : endOfWeek(weekDate);
  return { start, end };
}

export function getRangeOfThisWeek(formatString) {
  return getRangeOfWeek(getWeek(new Date()), formatString);
}

export function getRangeOfThisMonth(formatString) {
  return getRangeOfMonth(getMonth(new Date()), formatString);
}
