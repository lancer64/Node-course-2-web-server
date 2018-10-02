const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials'); //to use partials an avoid writing everything all ovr again
app.set('view engine', 'hbs'); //to use hbs

app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if(err)
		{
			console.log('Unable to append to server log');
		}
	});
	next(); // so the other functions get fired.
}); //how i register middleware
//next is used to say when my middleware function is done.

app.use((req, res, next) => {
	res.render('maintenance.hbs');
});


app.use(express.static(__dirname + '/public')); //dirname stores the path to my project's directory

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

//To be used by other hbs
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	//res.send('<h1>Hello and cum<h1>');
	res.render('server.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my website',
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'	
		//currentYear: new Date().getFullYear();
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Unable to handle request'
	}); 
});

app.listen(3000, () => {
	console.log('Server is up port 3000');
}); //binds the application to a port of our machine

