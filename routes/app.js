var express = require('express'); 
var router = express.Router();

var Filme = require('../models/filme');

router.get('/', function (req, res, next) {
    res.render('index');
});


// FILMES
router.get('/filmes', function(req, res, next){
    res.render('autor_criar_filmes');
});

//POST request para criar um Filme
router.post('/filmes', function(req, res, next){

    //Cria um objeto Filme
    const filmes = []
    const filme = new Filme({
        filme: req.body.filme,
        usuario: req.body.usuario,
    });

    filme.save((err) => {
        if (err) {
            return next(err);
        }
        //Sucesso - redireciona para listagem de filmes
        filmes.push(filme)

        res.redirect('/listafilmes');
       
        
    });
});

//Get request ppara a listagem de todos os filmes -> http://localhost:3000/filmes
router.get('/listafilmes', function(req, res, next){

    Filme.find()
    .exec(function (err, lista_filmes){
        if (err) {
            return next(err);
        }
        //Sucesso, então vamos renderizar
        res.render('lista_filmes', {titulo: 'Lista de Filmes', lista: lista_filmes, listaExiste: true }); 
    });
});


//GET request para um Autor -> http://localhost:3000/filme/LuisHenrique
router.get('/filme/:id', function(req, res, next){

    Filme.findOne({usuario: req.params.id}, function(err, usuario){
        if (err) {
            return next (err);
        }
        // Sucesso, então vamos renderizar
        res.render('lista_filmes', {titulo: 'Usuário', lista: usuario, listaExiste: false});
    });
});



//DELETE 
// router.get('/listafilmes/:id', function(req, res, next){

//     Filme.deleteOne({_id: req.params.id}, function(err){
//         if (err) {
//             return (err);
//         }
//             // Sucesso, então vamos renderizar
//             console.log('Filme apagado com sucesso')
//             next()
//             res.redirect('/listafilmes')
        
//     });
// });

router.post('/listafilmes/deletar', (req, res) => {
    Filme.deleteOne({_id: req.body.id}).lean().then(() =>{
        res.redirect('/listafilmes')
        console.log('Filme deletado com sucesso')
    }).catch((err)=>{
        res.redirect('/listafilmes')
    })
})

router.get('/delete', (req, res) => {
    res.render('apagar_filme');
})

router.get('/buscar', function(req, res, next){
    
    next();
    res.render('buscar');
    

})

module.exports = router;