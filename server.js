const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: '*'
  }
})

const bodyParser = require('body-parser')
const cors = require('cors')

// 跨域请求
app.use(
  cors({
    credentials: true, // 允许携带cookie
    // origin: ['http://localhost:8080', 'http://localhost:8888'], // 指定接收的地址
    methods: ['GET', 'POST'], // 指定接收的请求类型
    alloweHeaders: ['Content-Type', 'Authorization'] // 指定header
  })
)

// body解析
app.use(bodyParser.json()) // 解析 application/json
app.use(bodyParser.urlencoded()) // 解析 application/x-www-form-urlencoded

app.get('/', function(req, res) {
  res.send('<h1>你好web秀</h1>')
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.json({
    errCode: '000',
    data: {
      token: 'Hello World!',
      userInfo: {
        name: 'Ludgoole',
        level: 'v3'
      }
    }
  })
})

app.post('/menu', (req, res) => {
  console.log(req.body)
  res.json({
    errCode: '000',
    data: {
      list: [1, 2, 3, 4]
    }
  })
})

io.on('connection', function(socket) {
  // 接收数据
  socket.on('login', function(obj) {
    console.log(obj.username)
    // 发送数据
    socket.emit('relogin', {
      msg: `你好${obj.username}`,
      code: 200
    })
  })
})

// io.set('origins', '*:*')

server.listen(3000, function() {
  console.log('listening on *:3000')
})
