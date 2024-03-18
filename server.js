const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidV4 } = require('uuid')
const bp = require('body-parser')

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bp.urlencoded({ extended: true }))

app.get('/', async (req, res)  =>{
 await res.sendFile(__dirname + '/public/login.html')
  // res.redirect(`/${uuidV4()}`)
})

app.post('/adm', async (req, res)  =>{
  let name = req.body.n1;
  let meeting=req.body.pass;
  console.log(name);
   res.redirect(`/${meeting}&${name}`)
 })

 app.get('/:room&:name',async (req, res) => {
  let name=await req.params.name ;
  let room=await req.params.room;
  console.log("--",name,room);
  res.render('room', { room:room,na:name})
})
app.get('/:room', (req, res) => {
  res.render('room', { room: req.params.room,na:"akshat"})
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId,NAME) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId,NAME)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId,NAME)
    })
  })
})

server.listen(3000)