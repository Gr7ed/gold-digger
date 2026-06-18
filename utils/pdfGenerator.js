import PDFDocument from 'pdfkit'
import fs from 'node:fs'
import path from 'node:path'
import { pipeline } from 'node:stream/promises'

export async function pdfGenerator(purchaseData) {
  try {
    const doc = new PDFDocument()
    const fileName = `receipt-${purchaseData.uuid}.pdf`
    const filePath = path.join(process.cwd(), 'data', fileName)

    const stream = fs.createWriteStream(filePath)

    doc.fontSize(20).text('GoldDigger Purchase Receipt', { align: 'center' })
    doc.moveDown()
    doc.fontSize(12).text(`Transaction ID: ${purchaseData.uuid}`)
    doc.text(`Date: ${new Date(purchaseData.timestamp).toLocaleString()}`)
    doc.text(`Amount Paid: £${purchaseData.amountPaid}`)
    doc.text(`Price Per Oz: £${purchaseData.pricePerOz}`)
    doc.text(`Gold Sold: ${purchaseData.goldSold} oz`)

    doc.end()
    await pipeline(doc, stream)

    console.log(`[PDF Generator] Mock receipt successfully generated at: ${filePath}`)
    return filePath
  } catch (error) {
    console.error('[PDF Generator] Error generating PDF:', error)
    throw error
  }
}