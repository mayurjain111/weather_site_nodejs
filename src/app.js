const express =require('express')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const path=require('path')
const hbs=require('hbs')


const app=express()
const publicdirpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partialpath)

app.use(express.static(publicdirpath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Mj'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Mj'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some helpful text',
        title:'Help',
        name:'Mj'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
    
     forecast(latitude, longitude, (error, fdata) => {
        if(error){
            return res.send({error})
        }
        res.send({
            forecast:fdata,
            location,
            address:req.query.address
        })
         
     })
})


})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mj',
        errormessage:'Help article not found!'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Mj',
        errormessage:'Page not found!'
    })
})

app.listen(3000,()=>{
    console.log('Server is running on Port 3000')
})