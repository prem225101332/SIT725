const mongoose = require('mongoose');
var express = require("express")
var app = express()

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

const ProjectSchema = new mongoose.Schema({
    title: String,
    image: String,
    link: String,
    description: String,
});
const Project = mongoose.model('Project', ProjectSchema);

const sampleProjects = [
    {
        title: "Kitten 4",
        image: "images/cat.jpg",
        link: "About Kitten 4",
        description: "Demo description about kitten 4"
    },
    {
        title: "Kitten 2",
        image: "images/cat2.jpg",
        link: "About Kitten 2",
        description: "Demo desciption about kitten 2"
    },
    {
        title: "Kitten 3",
        image: "images/cat3.jpg",
        link: "About Kitten 3",
        description: "Demo desciption about kitten 3"
    }
];

Project.insertMany(sampleProjects)
    .then(() => console.log("Sample projects saved!"))
    .catch((err) => console.error(err));
    
app.get('/api/projects', async (req,res) => {
    const projects = await Project.find({});
    res.json({statusCode: 200, data: projects, message:"Success"})
})

var port = process.env.port || 3004;



app.listen(port,()=>{
    console.log("App listening to: "+port)
})
