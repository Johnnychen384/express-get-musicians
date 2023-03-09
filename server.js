const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")
const musicRouter = require("./router/musicianRoutes")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/musicians", musicRouter)

app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})