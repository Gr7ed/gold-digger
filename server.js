import http from "node:http";
import { serveStatic } from './utils/serveStatic.js'

const PORT = 8000

const __dirname = import.meta.dirname

const server = http.createServer((req, res) => {
    if (!req.url.startsWith('/api')) {
        return serveStatic(req, res, __dirname)
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