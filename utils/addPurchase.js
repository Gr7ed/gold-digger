import path from 'node:path'
import fs from 'node:fs/promises'
import { getData } from './getData.js'
import { v4 as uuidv4 } from 'uuid'

export async function addPurchase(newPurchase) {
  try {
    newPurchase.uuid = uuidv4()
    newPurchase.timestamp = new Date().toISOString()

    const purchases = await getData()
    purchases.push(newPurchase)

    const pathJSON = path.join(process.cwd(), 'data', 'purchases.json')

    await fs.writeFile(pathJSON, JSON.stringify(purchases, null, 2), 'utf8')
    return newPurchase
  } catch (err) {
    console.error('Error adding purchase:', err)
    throw new Error('Could not add purchase.')
  }
}