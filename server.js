const express = require("express");
const app = express();
const {Musician} = require("./Musician")
const {sequelize} = require("./db")
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

//TODO
app.get("/musicians", async (req, res) => {
    const musiciansArr = await Musician.findAll();
    res.json(musiciansArr)
})

app.get("/musicians/:id", async (req, res) => {
    const target = await Musician.findByPk(req.params.id)
    res.json(target)
})

app.post("/musicians", async (req, res) => {

    try{
        const formData = await Musician.create(req.body)
        res.status(200).json(formData)
    } catch(error) {
        console.error(error)
        res.status(404).send("Could not create new instance.")
    }
    
})


app.put("/musicians/:id", async (req, res) => {
    try{
        const target = await Musician.findByPk(req.params.id)
        const {name, instrument} = req.body
        await target.update({name: name, instrument: instrument})
        res.status(200).json(target)

    } catch(error) {
        console.error(error)
        res.status(404).send("Could not create new instance.")
    }
})


app.delete("/musicians/:id", async (req, res) => {
    try{

        const target = await Musician.findByPk(req.params.id)
        console.log("Found target: ", target)
        await target.destroy()
        res.status(200).send("Successfully deleted.")
        

    } catch(error) {
        console.log(error)
        res.status(404).send("Could not create new instance.")
    }
})



app.listen(port, () => {
    sequelize.sync();
    console.log(`Listening on port ${port}`)
})