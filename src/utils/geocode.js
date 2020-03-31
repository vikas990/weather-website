const request = require('request')


const geocode = (address,callback)=>{

	const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidmlrYXMta3VtYXIiLCJhIjoiY2s4YXB6aTh1MDQ2YTNtcWZlbWRwc3I0aSJ9.Bmaus-aWX9fdD6qxFZDCuA'

	request( { url, json: true}, (error, {body})=>{
		if(error){
			callback('Unable to connect to the Location Service!',undefined)
		}else if(!body.features){
			callback('Unable to get the place please try enter a valid place!',undefined)
		}else{
			callback(undefined,{
				latitude: body.features[0].center[0],
				logitude: body.features[0].center[1],
				Location: body.features[0].place_name
			})
		}
	})
}


module.exports=geocode