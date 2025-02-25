const useCompareDate = (stringDateOne, stringDateTwo) => {
  let dateOne;
  let dateTwo;
  if (typeof stringDateOne === "string") {
    dateOne = new Date(stringDateOne);
  } else {
    dateOne = stringDateOne;
  }
  if (typeof stringDateTwo === "string") {
    dateTwo = new Date(stringDateTwo);
  } else {
    dateTwo = stringDateTwo;
  }

  if (dateOne < dateTwo) {
    return -1;
  } else if (dateOne > dateTwo) {
    return 1;
  } else {
    return 0;
  }
};

export default useCompareDate;
