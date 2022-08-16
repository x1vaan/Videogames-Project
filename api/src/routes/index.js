const e = require('express');
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios').default
const { API_KEY } = require('dotenv').config()
const { Videogame } = require('../db.js')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', async (req, res) =>{
    try {
   var videogamesReq = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947`)
   var videogamesReq2 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=2`)
   var videogamesReq3 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=3`)
   var videogamesReq4 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=4`)
   var videogamesReq5 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=5`)
   var videogamesjoin =  videogamesReq.data.results.concat(videogamesReq2.data.results).concat(videogamesReq3.data.results)
   .concat(videogamesReq4.data.results).concat(videogamesReq5.data.results)
   var nombre = req.query.name
   if(nombre){
    nombre = nombre.charAt(0).toUpperCase() + nombre.slice(1);
    const fifteenvideogames = [];
    videogamesjoin.map(game => {
     const {id,name, genres, background_image} = game
     if(name.includes(nombre)) fifteenvideogames.push({id,name,genres,background_image})
    });
    if(fifteenvideogames.length === 0){
      return res.status(404).send(`${nombre} not found`)
    } 
    return res.status(200).send(fifteenvideogames);
   }
    const videogames = [];
    videogamesjoin.map(game => {
     const {id,name,genres,background_image} = game
     videogames.push({id,name,genres,background_image});
    });
    res.status(200).send(videogames);
    } catch (error) {
        res.status(404).send(error.message)
    }  
});
router.get('/videogame/:id', async (req, res) => {
  try {
    const identifier = req.params.id
  var videogamesReq = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947`)
  var videogamesReq2 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=2`)
  var videogamesReq3 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=3`)
  var videogamesReq4 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=4`)
  var videogamesReq5 = await axios.get(`https://api.rawg.io/api/games?key=14e965232ec14e429d19dceb4fa87947&page=5`)
  var videogamesjoin =  videogamesReq.data.results.concat(videogamesReq2.data.results).concat(videogamesReq3.data.results)
  .concat(videogamesReq4.data.results).concat(videogamesReq5.data.results)
     const videogame =  videogamesjoin.find(game=> game.id == identifier) 
     const {name,genres,background_image,released,rating,parent_platforms} = videogame
   res.status(200).send({name,genres,background_image,released,rating,parent_platforms});
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
    console.log(error.message)
  }
});

module.exports = router;
