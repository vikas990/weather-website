const request = require('request')

const forecast = (logitude,latitude,callback)=>{

	const url = 'https://api.darksky.net/forecast/8dabe94319c5f6806a77720c03c1389a/'+latitude+','+logitude

	request({ url ,  json: true},(error,{body})=>{
		if(error){
			callback('Unable to connect to the Weather Service!',undefined)
		}else if(body.error){
			callback('Unable to get the Location!',undefined)
		}else{
			callback(undefined,body.daily.data[0].summary+'It is currently '+body.currently.temperature+' degrees out there. There is a '+body.currently.precipProbability+'% chance of rain.')
		}
	})
}

module.exports=forecast