console.log('Client side server setup!')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')




weatherForm.addEventListener('submit', (e)=>{
   e.preventDefault()


   const location = search.value

   messageOne.textContent='Loading..... '
   messageTwo.textContent=''

fetch('http://localhost:3000/weather?address='+location).then((response) => {
	if(!location){
		messageOne.textContent=' Please enter a Location'
	}else{
		response.json().then((data)=>{

			console.log(data.Location)
			messageOne.textContent=data.Location
			messageTwo.textContent=data.forecast
	})
	}

		

		
	})

   

})