const { Router } = require('express');
const axios=require("axios")
const router = Router();
const { Breed, Temperament } = require('../db');
module.exports=router;

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

router.get("/dogs/:id", async(req, res) => {
    const dogs = await get_all_dogs();
    const dog = dogs.filter(el => el.id == req.params.id);
    if (dog.length) {
        res.status(200).json(dog);
    }else{
        res.status(404).send("not found");
    }
});
