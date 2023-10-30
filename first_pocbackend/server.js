const express = require('express');
const userroutes = require('./src/userinfo/routes');
var bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const port = 5050;
app.get("/", (req, res) => {
    res.send("IT working");
});
app.use(express.json());
app.use(bodyParser.json())

app.use(cors())
app.use("/api/call/userinfo/", userroutes);

app.listen(port, () => { console.log(`IT is worked succefully ${port}`); })

module.exports=app;