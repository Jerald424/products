export const amountFormat = (amt: string | number = 0) => {
  try {
    return `₹ ${Number(amt).toLocaleString()}`
  } catch (error) {
    console.log(error)
    return amt
  }
}

interface checkValueAreIncludesProps {
  txt: string;
  searched: string;
}

export const checkValueAreIncludes = (arg: checkValueAreIncludesProps) => {
  try {
    return String(arg?.txt)
      ?.toLowerCase()
      ?.replace(/\s+/g, '')
      ?.includes(arg?.searched?.toLocaleLowerCase()?.replace(/\s+/g, ''));
  } catch (error) {
    console.error(error);
  }
};