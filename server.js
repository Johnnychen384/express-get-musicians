const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")

const port = 3000;

//TODO
app.get("/musicians", async (req, res) => {
    const musiciansArr = await Musician.findAll();
    res.json(musiciansArr)
})

app.get("/musicians/:id", async (req, res) => {
    const target = await Musician.findByPk(req.params.id)
    res.json(target)
})


app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})