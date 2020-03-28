const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url= 'https://api.darksky.net/forecast/8086b3776dd58ef96dcf1b9f62099899/'+latitude+','+longitude+'?units=si'
    request({url,json:true},(error,{body})=>{
          if(error){
            callback('Unable to connect to weather service',undefined)
          } 
          else if(body.error){
              callback('Locaton not found',undefined)
          }
          else{
            callback(undefined,body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degrees out. There is a '+body.currently.precipProbability+' % chance of rain.')
          }
            
        })
}

module.exports=forecast