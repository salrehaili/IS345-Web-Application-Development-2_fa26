import express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';




// Storing token as cookie with httpOnly:true flag is pretty secure from XSS attack but it can be vulnerable to CSRF attack.
// https://www.linkedin.com/pulse/jwt-authentication-middleware-expressjs-building-secure-tamjid-ahmed
// https://stackoverflow.com/questions/34589272/how-to-set-authorization-headers-with-nodejs-and-express

// Focus on this
// https://dev.to/m_josh/build-a-jwt-login-and-logout-system-using-expressjs-nodejs-hd2

const app = express();
app.set('view engine', 'ejs');

dotenv.config()
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));

// I am using the JWT token here for authorization
// Once the user is logged in, each subsequent request will include the JWT,


// const checklogin = (req, res, next)=>{
//   if(!req.cookies.lab12){
//     res.redirect('/login');
//   } else {
//     res.locals.user = req.cookies.lab12;
//     next();
//   }
// }

// This middleware is invoked for every incoming request and its job is to ensure the request is authenticated.
const checklogin2 = (req, res, next)=>{
  const token = req.cookies.lab12;
  try{
      const user = jwt.verify(token, "Secret key is here");
      req.user=user;

      // res.locals.success=true;
      // res.locals.notification_no=30;
      res.locals.user = user;

      next();
  } catch(err){
      res.clearCookie('lab12');
      // return res.redirect('/');
      res.redirect('/login');
  }
}


const checklogin = (req, res, next)=>{
  const authHeader = req.header('Authorization');

  if (authHeader && authHeader.startsWith('Code ')) {
      const token = authHeader.substring(5);
      // Validate and use the token for authentication
      res.status(200).json('Authenticated');



      try{
          const user = jwt.verify(token, process.env.TOKEN_SECRET);
          req.user=user;

          res.locals.success=true;
          res.locals.notification_no=30;
          res.locals.user = user;

          next();
      } catch(err){
          res.clearCookie('ams');
          // return res.redirect('/');
          res.render('login');

          res.status(401).json({ error: 'Invalid token' });

      }



    } else {
      res.status(401).send('Unauthorized');
    }

 
}






////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////

const connection = new Sequelize({
    dialect: 'sqlite',
    storage: './lab12.db',
    logging: false
});


////////////////////////////////////////////////// Connection///////////////////////////////////////////////////////////////////


////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////
const userSchema ={
    // Model attributes are defined here
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: { 
        args: false,
         msg: 'First Name is required' 
      }
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    }
}

const User = connection.define('users', userSchema, {timestamps: true, freezeTableName: true});

connection.sync();

  // `sequelize.define` also returns the model
//   console.log(User === sequelize.models.User); // true
////////////////////////////////////////////////// Model///////////////////////////////////////////////////////////////////

app.get('/',checklogin, (req, res) => {
  res.render('main');
})


app.get('/users',checklogin, (req, res) => {
    User.findAll()
    .then((result)=>{
    res.render("users", {data:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.get('/users/:id',checklogin, (req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
        res.send(result);
    })
    .catch((err)=>{
        console.log(err);
    })
});

app.get('/adduser',checklogin, (req, res)=>{
  res.render("adduser", {success: true, data:{}});
})

app.post('/adduser', checklogin,(req, res) => {
      User.build(req.body)
      .save()
          .then((result) =>{
              res.redirect('/users');
          })
          .catch((err)=>{
              res.render("adduser", {success: false, data: req.body, msg: err.message})
          });            
})

app.get('/updateuser/:id', checklogin,(req, res)=>{
  User.findOne({where: {id: req.params.id}})
    .then((result)=>{
      res.render('updateuser',{success: true, data:result});
    })
    .catch((err)=>{
        console.log(err.message);
    }) 
})

app.post('/updateuser/:id', checklogin,(req, res)=> {
  User.update(req.body,
    {where: {id: req.params.id}}
  )
  .then((result)=> {
    res.redirect('/users');
  })
  .catch((err)=>{
    req.body.id=req.params.id;
    res.render("updateuser", {success: false, data: req.body, msg: err.message})
  })
})

app.get('/deleteuser/:id',checklogin, (req, res)=>{
  User.destroy({ where: {id: req.params.id} })
  .then((result) => {
          res.redirect('/users')
      });
})

app.get('/login', (req, res)=>{
  res.render('login', {data:{}});
});

app.post('/login', (req, res)=>{
  const user ={
    loggedin: true,
}
  User.findOne({where: {email: req.body.email, password: req.body.pass}})
  .then((result)=>{
    if(result)
    {
      user.username= result.firstName;
      
      const token = jwt.sign(user, "Secret key is here", 
        // {expiresIn: '1h'}
        );

      // res.cookie('lab12', token, {maxAge: 2*60*1000, httpOnly: true});
      res.setHeader('Authorization', 'Code '+ token); 
      return res.status(200).json({token});
      
      

      res.redirect('/');
    }else{
      res.render('login', {data: req.body, err_msg: 'incorrect email or password'});
    }

  })
  .catch((err)=>{
      res.render('login', {data: req.body, err_msg: err.message});
  })
})

app.get('/logout',checklogin ,(req, res)=>{
  res.clearCookie('lab12');
  res.redirect('/');
  
})



app.listen(3000 || PORT, () => {
    console.log(`Online compiler Server listening on port 3000`);
});