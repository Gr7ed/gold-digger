import http from "node:http";
import { serveStatic } from './utils/serveStatic.js'
import { handlePrice, handleGet, handlePost } from './handlers/routeHandlers.js'


const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer(async(req, res) => {
    if (!req.url.startsWith('/api')) {
        return serveStatic(req, res, __dirname)
    } else if (req.url === '/api/live/prices') {
        if (req.method === 'GET') {
            return handlePrice(req, res)
        } else {
            console.log(`Method ${req.method} not allowed on /api/live/prices`)
        }
    } else if (req.url === '/api/purchases') {
        if (req.method === 'GET') {
            return handleGet(req, res)
        } else if (req.method === 'POST') {
            return handlePost(req, res)
        } else {
            console.log(`Method ${req.method} not allowed on /api/purchases`)
        }
    } else {
        console.log(`Route ${req.url} not found`)
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('404 Not Found')
    }
})

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})