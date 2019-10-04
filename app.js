const fs = require('fs');

const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);

const socketIo = require('socket.io');
const io = socketIo(server);

const path = require('path');

const session = require('express-session');
app.use(session({
    secret: 'Ozel-Anahtar',
    resave: false,
    saveUninitialized: true
}));


// dosyaları tarayıcıya aç
app.use('/public', express.static(path.join(__dirname, 'public/')));
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css/')));



// anasayfa Get
app.get('/', function(req, res) {
    fs.readFile('index.html', function(req, data) {
        res.write(data);

        res.end();
    });
});

// Chatroom Get
app.get('/chatroom', function(req, res) {
    fs.readFile('chatroom.html', function(req, data) {
        res.write(data);
        res.end();
    });
});

// Chatroom Name Session Get
app.get('/se/:userName', function(req, res) {
    var data = req.params;
    req.session.buusername = data['userName'];
    res.redirect('/chatroom') // çalışıyor
    res.end()
});

// seşına get
app.get('/sezin', function(req, res) {
    if (req.session.buusername) {
        res.send(req.session.buusername);
        return
        res.end();
    } else {
        res.send('Punk');
        res.end();
    }
});





// socket io server işlemleri
io.on('connection', (socket) => {

    var buUser = "Bir kullanıcı"
    console.log(buUser + ' bağlandı')
    socket.on('disconnect', function() {
        console.log(buUser + ' ayrıldı');
    });
    socket.on('chat-message', function(msg, name) {
        console.log('Mesaj: ' + name + ': ' + msg);
        io.emit('chat-message', msg, name);
    });
    socket.broadcast.emit('hi');
})

io.emit('some event', { for: 'everyone' });



// serveri dinle
server.listen(3000);