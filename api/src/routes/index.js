const e = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default
require('dotenv').config()
const {API_KEY} = process.env
const { Videogame, Genre } = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) =>{
    try {
   var nombre = req.query.name
   if(nombre){
    const videogamesquery = await axios.get(`https://api.rawg.io/api/games?search=${nombre}&key=${API_KEY}`)
    if(videogamesquery.data.results.length === 0) return res.status(404).send(`${nombre} not found`)
    const fifteenvideogames = [];
    for(var i = 0; i<=15 ; i++){
     const {id,name, genres, background_image} = videogamesquery.data.results[i]
     fifteenvideogames.push({id,name,genres,background_image})
    } 
    return res.status(200).send(fifteenvideogames);
   } else {
    var videogamesReq = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`)
    var videogamesReq2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
    var videogamesReq3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
    var videogamesReq4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
    var videogamesReq5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
    var videogamesjoin =  videogamesReq.data.results.concat(videogamesReq2.data.results).concat(videogamesReq3.data.results)
    .concat(videogamesReq4.data.results).concat(videogamesReq5.data.results)
     const videogames = [];
     videogamesjoin.map(game => {
      const {id,name,genres,background_image} = game
      videogames.push({id,name,genres,background_image});
     });
     res.status(200).send(videogames);
   }
    } catch (error) {
        res.status(404).send(error.message)
    }  
});

router.get('/videogame/:id', async (req, res) => {
  try {
    const identifier = req.params.id
    const videogame = await axios.get(`https://api.rawg.io/api/games/${identifier}?key=${API_KEY}`)
    const {name,genres,background_image,released,rating,parent_platforms,description_raw} = videogame.data
   res.status(200).send({name,genres,background_image,released,rating,parent_platforms,description_raw});
  } catch (error) {
    res.status(404).send(error.message)
  }
});

router.post('/videogames/create', async (req, res) =>{
  try {
    const {name,description,release_date,rating,platforms} = req.body
    const ivan = await Videogame.create({name,description,release_date,rating,platforms})
   return res.status(200).send(ivan)
  } catch (error) {
    res.status(404).send(error.message)
  }
});

router.get('/genres', async (req, res) => {
 try {
  const generosdb = await Genre.findAll();
  if(generosdb.length !== 0) return res.status(200).send({creados : generosdb})
    const genres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
      const names = genres.data.results.map(genre => {
        const {name} = genre 
        return {name}
        });
    await Genre.bulkCreate(names);
    const generos = await Genre.findAll()
    res.status(200).send(generos)
 } catch (error) {
   res.status(404).send(error.message)
 }
});

module.exports = router;
