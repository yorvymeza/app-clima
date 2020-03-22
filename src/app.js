const express= require('express');
const path= require('path');
const morgan= require('morgan');
const app= express();


// setting

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleare

app.use(morgan('dev'));



// routes

app.use(require('./routes/index.js'));


// static file

app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res)=>{
	  res.status(404).end('<b>404 not found</b>');
});

app.listen(app.get('port'),()=>{ 
      console.log('server on port',app.get('port'));
 });

