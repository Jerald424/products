export const amountFormat = (amt: string | number = 0) => {
  try {
    return `₹ ${Number(amt).toLocaleString()}`
  } catch (error) {
    console.log(error)
    return amt
  }
}