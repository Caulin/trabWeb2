var express = require('express');
var router = express.Router();
var passport = require('passport');
debugger;

function  autentificaMiddleware(){
  return function (req, res, next){
    if(req.isAuthenticated()){
      return next()
    }
    res.redirect('/login?fail=true')
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { message: null });
});

router.get('/cadastro',autentificaMiddleware() ,function(req, res){
  global.dbC.listaTodos((e, docs) => {
    if(e){
      return console.log(e);
    }
    res.render('cadastro',{username: req.user.username, docs:docs});
  })

})
router.get('/Novo', autentificaMiddleware(), function(req, res){
if (req.query.fail) {
  res.render('Novo',{message:""});

}else{
  res.render('Novo',{message:null});
}
});
router.get('/login', function(req, res){
  if(req.query.fail){
    res.render('login', {message: 'Usuario e/ou senha incorretos'});
  }else{
    res.render('login',{message: null});
  }

});
//post
router.post('/login',
  passport.authenticate('local', { successRedirect: '/cadastro', failureRedirect: '/login?fail=true' })

);


router.post('/Novo', autentificaMiddleware(), function(req,res){

if (req.body.nomeProfessor === ""|| req.body.nomeAluno===""||req.body.tema === "") {
   res.render('Novo',{message:'Todos os campos devem ser preenchidos'})
}else{
  var nomeProfessor = req.body.nomeProfessor;
  var orientacoes = {"nomeAluno":req.body.alunoNome,"tema":req.body.tema};

      global.dbC.inserir({nomeProfessor, orientacoes},(err, result) =>{
        if(err) return console.log(err);
        res.redirect('/cadastro');
  })
}
})

module.exports = router;
