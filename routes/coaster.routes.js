const express = require('express')
const router = express.Router()
const Coaster = require('../models/coaster.model')
const Park = require('../models/park.model')


router.get('/new', (req,res)=>{
    Park.find()
    .then((parks)=>{
        res.render('coasters/new-coaster', {parks})
    })
    
})


router.get('/:id', (req,res)=>{
    Coaster.findOne({_id: req.params.id})
    .populate('park')
    .then((coasterFound) => {
        res.render('coasters/coaster-details', coasterFound)
    })
    
})


router.get('/', (req,res)=>{
    Coaster.find()
    .populate('park')
    .then((coasters)=>{
        console.log(coasters)
        res.render('coasters/coasters-index', {coasters})
    })
    .catch((err)=>{
        console.log(err)
    })
    
})

router.post('/new', (req,res)=>{
    
    Coaster.create({
        name: req.body.name,
        description: req.body.description,
        inversions: req.body.inversions,
        length: req.body.length,
        park: req.body.park
      })
      .then(() => {
        res.redirect('/coasters')
      })
})


router.get('/:id/edit', (req, res, next) => {
    let parks;
    Park.find()
    .then((parksPayload)=>{
        parks = parksPayload
        return Coaster.findById(req.params.id).populate('park')
    })
    .then(coastersPayload => {
        console.log(parks, coastersPayload)
        res.render("coasters/edit-coaster", {
            parks: parks,
            coaster: coastersPayload
        })
    })
  });


router.post('/:id/edit', (req, res, next) => {
    console.log("MIRA AKI " +req.body.id)
    Coaster.updateOne(
      {_id: req.body.id},
      {
        name: req.body.name,
        description: req.body.description,
        inversions: req.body.inversions,
        length: req.body.length,
        park: req.body.park
        }
      )
      .then(()=>{
        res.redirect('/coasters')
      })
  
  })



router.post('/:id/delete', (req, res, next) => {
    console.log(req.body.id)
    Coaster.findByIdAndRemove(req.body.id)
      .then(() => {
        res.redirect('/coasters')
      })
      .catch(() => {
        next()
      })
  });


module.exports = router