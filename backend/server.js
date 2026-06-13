const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const authRoute = require('./routes/authRoute')
const videoRoute = require('./routes/routeVideo')
const channelRoutes = require("./routes/channelRoutes");
const express = require('express')
const app = express()
const cors = require('cors')
const { default: mongoose } = require('mongoose')
require('dotenv').config()

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use("/api/videos", videoRoute);
app.use("/api/channel", channelRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('Database Connected'))
.catch((err)=>console.log(err))

app.get('/', (req, res)=>{
    res.send('Api Running')
})

const PORT = process.env.PORT || 4000
app.listen(PORT,()=>{
    console.log(`server Runing on this ${PORT}`)
})