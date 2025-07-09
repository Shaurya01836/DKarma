export const formatCurrency = (amount: number, currency = "USD") => {
  const sign = amount >= 0 ? "+" : ""
  return `${sign}$${Math.abs(amount).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} ${currency}`
}

export const formatDate = (dateString: string, withTime = false) => {
  const options: Intl.DateTimeFormatOptions = withTime
    ? {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    : {
        year: "numeric",
        month: "short",
        day: "numeric",
      }

  return new Date(dateString).toLocaleDateString("en-US", options)
}
