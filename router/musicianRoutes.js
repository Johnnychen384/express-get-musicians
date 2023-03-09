const express = require("express")
const app = express()
const { Musician } = require("../Musician")
const {sequelize} = require("../db");
const router = express.Router()
const {check, validationResult} = require("express-validator")
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

//TODO
router.get("/", async (req, res) => {
    const musiciansArr = await Musician.findAll();
    res.json(musiciansArr)
    
})

router.get("/:id", async (req, res) => {
    const target = await Musician.findByPk(req.params.id)
    res.json(target)
})

router.post("/", [check("name").not().isEmpty().trim(), check("instrument").not().isEmpty().trim(), check("name").isLength({min: 2, max: 20})], async (req, res) => {

    try{
        const errors = validationResult(req) // 

        console.log('if there are errors',errors)
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }

        const formData = await Musician.create(req.body)
        const musiciansArr = await Musician.findAll();

        res.status(200).json(musiciansArr)
    } catch(error) {
        console.error(error)
        res.status(404).send("Could not create new instance.")
    }
    
})


router.put("/:id", async (req, res) => {
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


router.delete("/:id", async (req, res) => {
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



module.exports = router