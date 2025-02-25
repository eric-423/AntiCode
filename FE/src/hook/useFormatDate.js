import { format, parseISO } from "date-fns";

function useFormattedDate(initialDateString, formatType = 'yyyy-MM-dd') {
  if (!initialDateString) {
    return "";
  }
  try {
    const date = parseISO(initialDateString);
    return format(date, formatType);
  } catch (error) {
    console.log(error)
  }
  return null;
}

export default useFormattedDate;
