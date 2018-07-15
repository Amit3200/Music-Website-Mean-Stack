const   express        = require('express'),
        app            = express(),
        mongoose       = require('mongoose'),
        bodyParser     = require('body-parser')
        db             = require('./models'),
        playlistRoutes = require('./routes/playlist'),
        authRoutes     = require('./routes/auth'),
        cors           = require('cors');
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/', function(req,res){
    res.send('Send a request to /api/auth/login to authenticate!!!');
})

app.use('/api/playlist/', playlistRoutes);
app.use('/api/auth/', authRoutes);

app.listen(PORT, function(){
    console.log(`The server is running on http://localhost:${PORT}`);
})
