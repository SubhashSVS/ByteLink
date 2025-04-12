const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const {User, URL} = require("./db");
const { nanoid } = require("nanoid");
const JWT_SECRET = process.env.JWT_SECRET;


const app = express();
app.use(express.json());
app.use(cors());

app.post('/api/login', async (req,res) => {
    const body = req.body;
    const user = await User.findOne({
        username : body.username
    })
    if(user){
        if(body.password != user.password){
            res.status(403).json({
                message : "Invalid Credential"
            })
        }
        const JWTtoken = jwt.sign({
            username : body.username
        }, JWT_SECRET);
        res.status(200).json({
            token : JWTtoken
        })
    }
    else{
        res.status(403).json({
            message : "Invalid Credentials"
        })
    }
})

app.post('/api/shorten', async (req,res) => {
    const body = req.body;
    if(!body.url){
        res.json({error : "No url input"});
    }

    const shortId = nanoid(6);

    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        clicks : 0
    });

    res.status(200).json({
        shortId : shortId
    });
})

app.get('/analytics', async (req,res) => {
    const data = await URL.find().sort({createdAt : -1});
    res.status(200).json({
        data : data.map(item => ({
            url : item.redirectURL,
            shortUrl : item.shortId,
            clicks : item.clicks,
            created : item.createdAt
        }))
    })
})

app.get('/:id', async (req,res) => {
    const id = req.params.id;
    const item = await URL.findOneAndUpdate({
        shortId : id
    },{
        $inc : { clicks : 1 }
    });

    if(!item){
        res.json({ error : "Invalid URL"});
    }
    res.status(200).json({
        url : item.redirectURL
    })
})


app.listen(3000);
