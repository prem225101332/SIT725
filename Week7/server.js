const mongoose = require('mongoose');
var express = require("express")
var app = express()
const projectRoutes = require('./Routes/projects');

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/projectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB!');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    setInterval(()=>{
        socket.emit('number', parseInt(Math.random()*10));
    }, 1000);
});

    
app.use('/api/projects', projectRoutes);

var port = process.env.PORT || 3004;

if (process.env.NODE_ENV !== 'test') {
    http.listen(port, () => {
        console.log("App listening to: " + port)
    })
}

module.exports = app;