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
        console.log(e);
        res.status(500).send(e);
    }
})



