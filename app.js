const express = require('express');
const  app =  express();
const morgan = require('morgan');
const bodyParser = require('body-parser');


const  rotaUsuarios = require('./routes/usuarios'); 

 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));//apenas dados simples
app.use(bodyParser.json());


app.use('/usuarios',rotaUsuarios); 



app.use('/manual',(req,res,next)=>{
       res.status(200).sendFile(__dirname+"/routes/manual.html");
});

// tratamento de erro
//caso acesso sem  rota 
app.use((req,res,next)=>{
    const erro = new Error ('Rota não informada');
    erro.status=404;
    next(erro);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem: error.message
        }

    });
});



module.exports = app;