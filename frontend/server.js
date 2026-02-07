/**
 * Custom Next.js Server with Socket.io
 *
 * This custom server integrates Socket.io WebSocket functionality
 * with Next.js App Router for real-time data updates.
 *
 * Usage:
 *   Development: npm run dev:socket
 *   Production:  npm run start:socket
 */

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = parseInt(process.env.PORT || '3000', 10)

// Initialize Next.js
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  // Create HTTP server
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  })

  // Initialize Socket.io server
  const { initializeSocketServer } = require('./lib/websocket/socket-server.ts')
  const io = initializeSocketServer(httpServer)

  // Start background polling service
  const { startPollingService, stopPollingService } = require('./lib/websocket/polling-service.ts')
  startPollingService()

  // Start HTTP server
  httpServer.once('error', (err) => {
    console.error(err)
    process.exit(1)
  })

  httpServer.listen(port, () => {
    console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🏥  LA Healthcare Access Dashboard                          ║
║                                                               ║
║   ✅  Next.js Server:  http://${hostname}:${port}${' '.repeat(Math.max(0, 24 - hostname.length - port.toString().length))}║
║   ✅  Socket.io:       WebSocket + Polling                    ║
║   ✅  Environment:     ${dev ? 'Development' : 'Production'}${' '.repeat(Math.max(0, 34 - (dev ? 'Development' : 'Production').length))}║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
`)
  })

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM signal received: closing servers')
    stopPollingService()
    httpServer.close(() => {
      console.log('✅ HTTP server closed')
      process.exit(0)
    })
  })

  process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT signal received: closing servers')
    stopPollingService()
    httpServer.close(() => {
      console.log('✅ HTTP server closed')
      process.exit(0)
    })
  })
})
