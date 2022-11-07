const { Router } = require('express');
const { Breed, Temperament } = require('../db');
const axios=require("axios")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');





async function get_api_dogs(){
    const api_data = await axios.get("https://api.thedogapi.com/v1/breeds?api_key="+process.env.API_KEY);
    return  await api_data.data.map(e => { 


        return {
            id: e.id,
            name: e.name,
            height: e.height.metric?.split(" - "),
            weight: e.weight.metric?.split(" - "),
            temperaments: e.temperament?.split(", "),
            life_span: e.life_span,
            image: e.image.url,
        }
    })
}
async function get_db_dogs(){
    return await Breed.findAll({
        include: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}
async function get_all_dogs(){
    return [...await get_api_dogs(), ...await get_db_dogs()];
}

const router = Router();



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);














router.get("/dogs",async(req,res)=>{
    try{
        const dogs = await get_all_dogs();
        if (req.query.name) {
            const dog = dogs.filter((e) => {
                return e.name.includes(req.query.name)
            });
                    /*
            id: e.id,
            name: e.name,
            height: e.height.metric?.split(" - "),
            weight: e.weight.metric?.split(" - "),
            temperaments: e.temperament?.split(", "),
            life_span: e.life_span,
            image: e.image.url,
        */
            if(dog.length){
                res.status(200).json({
                    id:dog.id,
                    name:dog.name,
                    temperaments:dog.temperaments,
                    weight:dog.weight,
                    image:dog.image
                })
            }else {
                res.status(404).send("not found");
            } 
        } else {
            res.status(200).json(dogs.map((dog)=>{
                return{
                    id:dog.id,
                    name:dog.name,
                    temperaments:dog.temperaments,
                    weight:dog.weight,
                    image:dog.image
                }
            }));
        }
    }catch(e){
        res.status(500).send(e);
    }
})



router.get("/dogs/:id", async(req, res) => {
    const dogs = await get_all_dogs();
    const dog = dogs.filter(el => el.id == req.params.id);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("not found");
    }
});
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
        image
        } = req.body
        if(!name||!min_height||!max_height||!min_weight||!max_weight)throw "incorrect data"
    
        var dog = await Breed.create({
        name,
        height: [min_height,max_height],
        weight: [min_weight,max_weight],
        life_span,
        image
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
