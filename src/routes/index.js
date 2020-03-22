const express = require('express');
const router= express.Router();

const Forecastio= require('forecastio');
const weather= new Forecastio('e76ca9c9e61d6d6cb497c58ddaf6713a');


router.get('/',(req, res)=>{
	  res.render('index');
});

router.get('/latitude/:latitude/longitude/:longitude',(req, res,next)=>{
	   console.log(req.params.latitude, req.params.longitude);

	   if(!req.params.latitude || !req.params.longitude){
	    res.status(404).json({
             msg: 'error'
	    });

	    }

	    let latitude= parseInt(req.params.latitude, 10);
	    let longitude= parseInt(req.params.longitude, 10);

	  
	 weather.forecast(latitude, longitude, (err, data)=>{
	 	 console.log(data);
	 	   if(err){
	 	   	next();
	 	   	return;
	 	   }

	 	   res.json({
	 	   	   temperature: data.currently.temperature,
	 	   	   timezone: data.timezone
	 	   });
	 });


  // res.end('<h1>Recivido</h1>');

});


module.exports= router;