var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

var pg = require('pg');
var pgConString = "postgres://postgres:123456@localhost/notifytest";
pg.connect(pgConString, function(err, client){
	if(err){
		console.log(err);
	}
	client.on('notification', function(msg){
		console.log(msg);
		io.emit('pg notify', msg);
	});
	var query = client.query('LISTEN watchers');
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});


