const eventSource = new EventSource("/api/live/prices") 

const liveContainer = document.getElementById("price-display")
const connectedStatus = document.getElementById("connected-status")

// Handle connection open
eventSource.onopen = () => {
  if (connectedStatus) {
    connectedStatus.textContent = "Connected 🟢"
  }
  console.log("Connection established.")
}

// Handle live price updates 
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data)
  const price = data.price
  if (liveContainer) {
    liveContainer.textContent = price
  }
}

// Handle connection loss
eventSource.onerror = () => {
  if (connectedStatus) {
    connectedStatus.textContent = "Disconnected 🔴"
  }
  console.log("Connection lost. Attempting to reconnect...")
}
