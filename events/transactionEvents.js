import { EventEmitter } from 'node:events'
import { pdfGenerator } from '../utils/pdfGenerator.js'
import { emailNotify } from '../utils/emailNotify.js'

export const transactionEmitter = new EventEmitter()

transactionEmitter.on('transaction-completed', async (purchase) => {
  try {
    await pdfGenerator(purchase)
    await emailNotify(purchase)
  } catch (err) {
    console.error('Error executing post-transaction tasks:', err)
  }
})