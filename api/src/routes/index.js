const { Router } = require('express');
const { Breed, Temperament } = require('../db');
const axios=require("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');







const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);



router.use(require("./dogs"));
router.use(require("./dogs-id"));



router.get("/temperament", async (req, res) => {
    var api_temps = await axios.get("https://api.thedogapi.com/v1/breeds?api_key="+process.env.API_KEY);
    api_temps = api_temps.data.map(e => e.temperament);
    api_temps = api_temps.toString().split(",");
    api_temps = api_temps.map(e=>e.trim());
    api_temps.forEach((name) => {
        Temperament.findOrCreate({
             where: { name }
        })
    })    
    res.send(await Temperament.findAll());
});

router.post("/dogs", async (req, res) => {

    
    try{
        var {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image,
        rewiew
        } = req.body
        if(!name||!min_height||!max_height||!min_weight||!max_weight)throw "incorrect data"
    
        var dog = await Breed.create({
        name,
        height: [min_height,max_height],
        weight: [min_weight,max_weight],
        life_span,
        image,
        rewiew
        })
        console.log(temperaments);
        temperaments.forEach((name) => {
            Temperament.findOrCreate({
                 where: { name }
            })
        })
        var temp = await Temperament.findAll({
            where: { name: temperaments},
        })
    
        dog.addTemperament(temp);
        res.status(200).send("dog created")
    }catch(e){
        console.log(e)
        res.send(e);
    }



})


module.exports = router;
