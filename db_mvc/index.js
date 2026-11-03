import express from 'express';
import path from 'path';
import Students from './models/students.js';

const app = express();
app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(path.dirname('.') + '/public'));

  app.get('/', (req, res)=>{
    res.send('Hello');
  });

  app.get('/students',(req, res)=>{
    Students.findAll()
    .then((result)=>{
        res.render('students', {data:result});
    })
    .catch((err)=>{
        console.log(err);
    })
  });
  
  app.post('/add', (req, res)=>{
    Students.build(req.body)
    .save()
    .then((result)=>{
        res.redirect('/students');
    })

  })
  app.get('/delete/:id', (req, res)=>{
    Students.destroy({ where: {id: req.params.id} })
    .then((result) => {
      res.redirect('/students');
    });
  });
  
  app.listen(80, ()=>{
    console.log('80 is open');
})