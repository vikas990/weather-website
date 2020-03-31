const path = require('path')

const express = require('express')

const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() 
const port = process.env.PORT || 3000
/* using app.get and giving the details to the function we can use only these things below*/
//also the path for connection
const publicDir = path.join(__dirname, '../public')
const viewspath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//setup handlers and views location
app.set('view engine','hbs')
app.set('views', viewspath)
hbs.registerPartials(partialspath)

//setup static directory server
app.use(express.static(publicDir)) 



app.get('', (req,res)=>{
	res.render('index', {
		title: 'Weather',
		name: 'JOKER'
	})
})

app.get('/help', (req,res)=>{
	res.render('help',{
		title: 'Help Page',
		message: 'If you need any help! Mere pass mat aaio!',
		name: 'JOKER'
	})
})


app.get('/about', (req,res)=>{
	res.render('about', {
		title: 'About Page',
		name: 'JOKER'

	})
})

/* practice handler below name products.*/
app.get('/products', (req,res)=>{
	if(!req.query.search){
		return res.send({
			Error:'you have to provite the search term.'
		})
	}

	console.log(req.query.search)
	res.send({
		product: []
	})
})
/*End of prctice handler*/

app.get('/weather', (req,res)=>{
	if(!req.query.address){
		return res.send({
			Error:'You have to provide a address'
		})
	}

 const address = req.query.address
/* calling the geocode and forecast function in here*/
geocode(address,(error,{latitude='',logitude='',Location=''}={})=>{
	

if(error){
	return res.send(error)
}

	forecast(latitude, logitude, (error, forecastdata) => {
		if(error){
	return res.send(error)
}
 res.send({
		forecast: forecastdata,
		Location: Location,
		Address: address

	})
})

})


	
})


app.get('/help/*', (req,res)=>{
	res.render('error', {
		title: '404',
		titleerror: 'Help aticle not found',
		name: 'JOKER'
	})
})


app.get('*', (req,res)=>{
	res.render('error', {
		title: '404 NOT FOUND',
		errormessage: 'Page not found',
		name: 'JOKER'
	})
})











app.listen(port, ()=>{
	console.log('Server is up on port '+port)
})