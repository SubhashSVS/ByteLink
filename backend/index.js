const express = require("express")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const useragent = require("express-useragent")
const {User, URL, dailyStats, deviceStats} = require("./db");
const { nanoid } = require("nanoid");
const JWT_SECRET = process.env.JWT_SECRET;


const app = express();
app.use(express.json());
app.use(cors());
app.use(useragent.express());

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
    const shortId = body.customAlias || nanoid(6);

    if(body.customAlias){
        const check = await URL.findOne({shortId});
        if(check) res.status(400).json({message : "Alias already taken"});
    }

    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        clicks : 0,
        createdAt : new Date(),
        ...(body.expiryDate && { expiryDate : new Date(body.expiryDate) })
    });

    res.status(200).json({
        shortId : shortId
    });
})

app.get('/analytics', async (req,res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const filter = req.query.filter || '';
    const skip = (page - 1)*limit;

    const search = filter ? {
        $or : [
            { shortId : {"$regex" : filter, "$options" : "i"} },
            { redirectURL : {"$regex" : filter, "$options" : "i"}}
        ] 
    } : {};

    const data = await URL.find(search).skip(skip).limit(limit).sort({createdAt : -1});
    const total = await URL.countDocuments();

    res.status(200).json({
        data : data.map(item => ({
            url : item.redirectURL,
            shortUrl : item.shortId,
            clicks : item.clicks,
            created : item.createdAt,
            expiryDate : item.expiryDate
        })),
        page,
        totalPages : Math.ceil(total/limit)
    });
})

app.get('/stats', async (req,res) => {
    const data = await URL.find();
    let count = 0;
    let active = 0;
    for(let item of data){
        count += item.clicks;
        if(!item.expiryDate || new Date() < item.expiryDate){
            active += 1;
        }
    }
    res.status(200).json({
        links : data.length,
        clicks : count,
        active : active
    });
})

app.get('/:id', async (req,res) => {
    const id = req.params.id;
    const deviceType = req.useragent.platform;
    const ip = req.headers['x-forward-for'];

    const item = await URL.findOneAndUpdate({
        shortId : id
    },{
        $push : {
            visitHistory : {
                timestamp : new Date(),
                deviceType : deviceType,
                ip : ip
            }
        },
        $inc : { clicks : 1 }
    });

    if(!item){
        return res.status(404).json({ error : "Invalid URL"});
    }

    await dailyStats.updateOne(
        { date : new Date().toISOString().split("T")[0] },
        { $inc : {
            totalClicks : 1
        }},
        { upsert : true }
    )

    await deviceStats.updateOne(
        { deviceType : deviceType },
        { $inc : {
            count : 1
        }},
        { upsert : true }
    )

    res.status(200).json({
        url : item.redirectURL
    })
})

app.get('/api/charts', async (req,res) => {
    const data1 = await dailyStats.find().sort({date : 1});
    const data2 = await deviceStats.find();
    res.json({
        clicksData : data1,
        deviceData : data2
    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
