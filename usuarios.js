const express = require('express');
const router = express.Router();
const mysql   = require('../mysql').pool;

//----------------------------------------------------------------------------------------------------
//Lista
router.get('/',(req, res, next) => {
    /*
      res.status(200).send({
            mensagem:'rota pedidos respondendo o GET  '

     });
     */

    mysql.getConnection((error,conn) =>{
      if (error) {return res.status(500).send({error:error})}
         
         conn.query(
              'select * from usuarios',
              (error,resultado,fields) =>{
                 
                 if (error) {return res.status(500).send({error:error})}
              
                  return res.status(200).send({response: resultado})
  
              }
  
         )
  
  
    })

});


//----------------------------------------------------------------------------------------------------
//Lista um
router.get('/:id_usuario',(req, res, next) => {
 
  mysql.getConnection((error,conn) =>{
  if (error) {return res.status(500).send({error:error})}
     
     conn.query(
          'select * from usuarios where id_usuario= ?; ',
          [req.params.id_usuario],
          (error,resultado,fields) =>{
             
             if (error) {return res.status(500).send({error:error})}
          
              return res.status(200).send({response: resultado})
  
          }
  
     )
  
  
  })
  
  });

//----------------------------------------------------------------------------------------------------
//insert
router.post('/',(req, res, next) => {
 
    const pedidos = { 
 

           tipo_usuario: req.body.tipo_usuario,  
           usuario     : req.body.usuario,        
           email       : req.body.email,        
           senha       : req.body.senha,        
           rg          : req.body.rg,         
           cpf         : req.body.cpf,         
           endereco    : req.body.endereco,     
           estado      : req.body.estado,        
           pais        : req.body.pais,            
           cep         : req.body.cep,         
           fone        : req.body.fone         

     
     }
 
     mysql.getConnection((error,conn) =>{
           conn.query(
              `insert into usuarios
              (tipo_usuario,usuario,email,senha,rg,cpf,endereco,estado,pais,cep,fone)
               values (?,?,?
                      ,?,?,?
                      ,?,?,?
                      ,?,?)`,
              [req.body.tipo_usuario,
               req.body.usuario,
               req.body.email,
               req.body.senha,
               req.body.rg,
               req.body.cpf,
               req.body.endereco,
               req.body.estado,
               req.body.pais,
               req.body.cep,
               req.body.fone],
              (error, resultado, field) =>{
                    conn.release(); //serve para resetar o pull para não travar
   
                     if (error){
                         return res.status(500).send({
                           error:error,
                           mensagem:'erro na inserção',
                           response:null
     
   
                         });  
                         
                     }
   
                     res.status(201).send({
                           mensagem:'Insere Usuarios: ',
                           mensagem:'Cadastrado',
                           pedidoCriado: pedidos
   
                     });
   
              }
            
           )
       })
 
});

//----------------------------------------------------------------------------------------------------
//Alteração o Update

router.patch('/',(req, res, next) => {
   
    mysql.getConnection((error,conn) =>{
      conn.query(
         `update usuarios
          set 
              tipo_usuario         =?,
              usuario              =?,
              email                =?,
              senha                =?,
              rg                   =?,
              cpf                  =?,
              endereco             =?,
              estado               =?,
              pais                 =?,
              cep                  =?,
              fone                 =?
              where id_usuario     =?
             `,
         [
          req.body.tipo_usuario,
          req.body.usuario,
          req.body.email,
          req.body.senha,
          req.body.rg,
          req.body.cpf,
          req.body.endereco,
          req.body.estado,
          req.body.pais,
          req.body.cep,
          req.body.fone,
          req.body.id_usuario],
         (error, resultado, field) =>{
               conn.release(); //serve para resetar o pull para não travar
  
                if (error){
                    return res.status(500).send({
                      error:error,
                      response:null
  
  
                    });  
                    
                }
  
                res.status(201).send({
                      mensagem:'Usuario alterado'
                     
  
                });
  
         }
       
      )
  })
   
  });
  


//----------------------------------------------------------------------------------------------------
//Delete
router.delete('/',(req, res, next) => {
   
 
  mysql.getConnection((error,conn) =>{
      conn.query(
         `delete from usuarios where id_usuario=?`,
         [req.body.id_usuario],
         (error, resultado, field) =>{
               conn.release(); //serve para resetar o pull para não travar
  
                if (error){
                    return res.status(500).send({
                      error:error,
                      response:null
  
  
                    });  
                    
                }
  
                res.status(201).send({
                      mensagem:'Usuario Apagado'
                     
  
                });
  
         }
       
      )
  })
   
  });

  

//----------------------------------------------------------------------------------------------------
module.exports = router;