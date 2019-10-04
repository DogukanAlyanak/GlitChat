var socket = io();

// Sessionlar adres
let sezin = 'https://' + window.location.host + '/sezin';

// bu tarayıcıdaki Kullanıcı
let Muser = 'Cyber';
$.get(sezin, function(data) {
    Muser = data;
});

// mesaj gönder
$('#sendBt').click(function(e) {
    e.preventDefault(); //prevents page reloading - sayfanın yenilenmesini engeller
    let message = $('#m').val()
    if (message == '') {} else {
        socket.emit('chat-message', message, Muser);
        $('#m').val('');
    }
    return false;
});

// gelen mesajlar 
socket.on('chat-message', function(msg, name) {
    if (name == Muser) {
        $('#messages').append($('<div class="message-box-me"><span>' + name + ': ' + msg + '</span></div>'));
    } else {
        $('#messages').append($('<div class="message-box-o"><span>' + name + ': ' + msg + '</span></div>'));
    }
});



// Giriş Click
$('#startBt').click(function() {
    let buname = $('#nameInput').val()
    let site = window.location.href;
    site = site + 'se/' + $('#nameInput').val();
    $(window).attr('location', site);
});