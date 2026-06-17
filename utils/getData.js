import fs from 'node:fs/promises'
import path from 'node:path'

export async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'purchases.json')
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    if (err.code === 'ENOENT') {
      return []
    }
    throw err
  }
}