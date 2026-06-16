import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'




// export async function handleGet(res) {
//   try {
//   const data = await getData()
//   const content = JSON.stringify(data)
//   sendResponse(res, 200, 'application/json', content)
//   } catch (err) {
//     sendResponse(res, 500, 'application/json', JSON.stringify({error: err}))
//   }
// }

// export async function handlePost(req, res) {

//   try {
//     const parsedBody = await parseJSONBody(req)
//     const sanitizedBody = sanitizeInput(parsedBody)
//     await addNewSighting(sanitizedBody)
//     sightingEvents.emit('sighting-added', sanitizedBody)
//     sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
//   } catch (err) {
//     sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
//   }
// }



