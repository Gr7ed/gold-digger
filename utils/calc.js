export function calcGoldSold(amountPaid, pricePerOz) {
  const amount = parseFloat(amountPaid)
  const price = parseFloat(pricePerOz)
  
  if (isNaN(amount) || isNaN(price) || price <= 0) {
    return 0
  }
  
  return parseFloat((amount / price).toFixed(4))
}