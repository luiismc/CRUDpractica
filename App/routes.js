module.exports = (app, passport) => {

    const User = require('../Modelo/Usuario');

    var ui = {
        menuitem: 1,
        data: []
    }

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('registro.ejs', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
    });
    
//Lista de usuarios


app.get('/getTodos',(req,res)=>{
    // get all Todo documents within our todo collection
    // send back to user as json
     User.find((err,documents)=>{
        if(err)
            console.log(err);
        else{
            res.json(documents);
        }
    });
});


//Agregar usuario


//borrar
app.delete('/(:id)', function(req, res, next) {	
	User.findOneAndRemove({"_id": req.params.id}, function(err, result) {
		if (err) {
			req.flash('error', err)
			// redirect to users list page
		} else {
			req.flash('success', 'User deleted successfully! id = ' + req.params.id)
            // redirect to users list page
            res.render('profile');
            
		}
	})	

});

 

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}}