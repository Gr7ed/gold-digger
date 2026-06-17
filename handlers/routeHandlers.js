import { sendResponse } from '../utils/sendResponse.js'
import { priceData } from '../data/priceData.js'
import { getData } from '../utils/getData.js'
import { addPurchase } from '../utils/addPurchase.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { calcGoldSold } from '../utils/calc.js'
import { transactionEmitter } from '../events/transactionEvents.js'

export function handlePrice(req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  const intervalId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * priceData.length)
    res.write(`data: ${JSON.stringify({ event: 'price-updated', price: priceData[randomIndex]})}\n\n`)
  }, 3000)

  req.on('close', () => {
    console.log('Client disconnected. Clearing interval.')
    clearInterval(intervalId)
    res.end()
  })
}

export async function handleGet(req, res) {
  try {
    const data = await getData()
    sendResponse(res, 200, 'application/json', JSON.stringify(data))
  } catch (err) {
    console.error(err)
    sendResponse(res, 500, 'application/json', JSON.stringify({ error: 'Server error while getting purchases.' }))
  }
}

export async function handlePost(req, res) {
  try {
    const body = await parseJSONBody(req)
    const sanitizedBody = sanitizeInput(body)
    
    // Verify calculation on the server side for security
    sanitizedBody.goldSold = calcGoldSold(sanitizedBody.amountPaid, sanitizedBody.pricePerOz)

    const newPurchase = await addPurchase(sanitizedBody)
    transactionEmitter.emit('transaction-completed', newPurchase)
    sendResponse(res, 201, 'application/json', JSON.stringify(newPurchase))
  } catch (err) {
    console.error(err)
    sendResponse(res, 400, 'application/json', JSON.stringify({ error: 'Bad request. Could not process purchase.' }))
  }
}
