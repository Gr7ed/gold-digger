export async function parseJSONBody(req) {
  try {
    const chunks = []
    let totalSize = 0
    const MAX_PAYLOAD_SIZE = 1e6 // 1MB limit

    for await (const chunk of req) {
      totalSize += chunk.length
      if (totalSize > MAX_PAYLOAD_SIZE) {
        throw new Error('Payload Too Large')
      }
      chunks.push(chunk)
    }
    const body = Buffer.concat(chunks).toString()
    return JSON.parse(body)
  } catch (error) {
    console.error('[Parse JSON] Error parsing JSON body:', error)
    throw error
  }
}