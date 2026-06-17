const eventSource = new EventSource("/api/live/prices") 

const liveContainer = document.getElementById("price-display")
const connectionStatus = document.getElementById("connection-status")
const investBtn = document.getElementById("invest-btn")
const investmentAmountInput = document.getElementById("investment-amount")
const dialog = document.querySelector("dialog")
const dialogSummary = document.getElementById("investment-summary")
const dialogCloseBtn = document.querySelector("dialog button")

// Handle connection open
eventSource.onopen = () => {
  connectionStatus.textContent = "Live 🟢"
}

// Handle live price updates 
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.price
  liveContainer.textContent = price
}

// Handle connection loss
eventSource.onerror = () => {
  connectionStatus.textContent = "Disconnected 🔴"
  console.log("Connection lost. Attempting to reconnect...")
}

// Handle investment form submission
investBtn.addEventListener("click", async (e) => {
  e.preventDefault() // Prevent form from submitting the default way

  const amount = parseFloat(investmentAmountInput.value)
  const currentPrice = parseFloat(liveContainer.textContent)

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid investment amount.")
    return
  }

  if (isNaN(currentPrice)) {
    alert("Could not determine the current price. Please wait for the connection to establish.")
    return
  }

  const goldSold = (amount / currentPrice).toFixed(4)

  const purchaseData = {
    amountPaid: amount,
    pricePerOz: currentPrice,
    goldSold: parseFloat(goldSold)
  }

  try {
    const response = await fetch('/api/purchases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(purchaseData),
    })

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)

    const result = await response.json()
    dialogSummary.textContent = `You just bought ${result.goldSold} ounces (ozt) for £${result.amountPaid}. You will receive documentation shortly.`
    dialog.showModal()
  } catch (error) {
    console.error("Error making purchase:", error)
    alert("There was an error processing your investment. Please try again.")
  }
})

dialogCloseBtn.addEventListener("click", () => dialog.close())
