const express = require('express')
const router = express.Router()
const Park = require('../models/park.model')

router.get('/new', (req,res)=>{
    res.render('parks/new-park')
})

router.post('/new', (req,res)=>{
    console.log(req.body)
    Park.create({
        name: req.body.name,
        description: req.body.description,
      })
      .then(() => {
        res.redirect('/')
      })
})

//Empieza el clon de coasters


router.get('/:id', (req,res)=>{
    Park.findOne({_id: req.params.id})
    .populate('park')
    .then((ParkFound) => {
        res.render('parks/park-details', ParkFound)
    })
    
})


router.get('/', (req,res)=>{
    Park.find()
    .then((Parks)=>{
        res.render('parks/parks-index', {Parks})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.post('/new', (req,res)=>{
    Park.create({
        name: req.body.name,
        description: req.body.description,
      })
      .then(() => {
        res.redirect('/parks')
      })
})


router.get('/:id/edit', (req, res, next) => {
    Park.findOne({_id: req.params.id})
    .populate('park')
    .then((ParkFound) => {
        res.render('parks/edit-park', ParkFound)
    })
  });


router.post('/:id/edit', (req, res, next) => {
    Park.updateOne(
      {_id: req.body.id},
      {
        name: req.body.name,
        description: req.body.description,
        }
      )
      .then(()=>{
        res.redirect('/parks')
      })
  
  })



router.post('/:id/delete', (req, res, next) => {
    Park.findByIdAndRemove(req.body.id)
      .then(() => {
        res.redirect('/parks')
      })
      .catch(() => {
        next()
      })
  });


module.exports = router