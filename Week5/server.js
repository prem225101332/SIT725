const mongoose = require('mongoose');
var express = require("express")
var app = express()
const projectRoutes = require('./Routes/projects');

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

app.use('/api/projects', projectRoutes);

var port = process.env.port || 3004;

app.listen(port,()=>{
    console.log("App listening to: "+port)
})