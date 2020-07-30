const User = require('../models/User'); 

function create(req, res){
    var user = new User(); 
    var params = req.body;
    console.log(params) 
    
    user.firstName = params.firstName; 
    user.lastName = params.lastName; 
    user.email = params.email; 
    user.age = params.age; 
    user.password = params.password; 

    user.save( (error, usercreated) => {
        if (error){
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        }else{

            if(!usercreated){
                res.status(400).send({
                    statusCode: 400, 
                    message: "Error al crear el usuario"
                })
            }else{
                res.status(200).send({
                    statusCode: 200, 
                    message: "Usuario creado correctamente",
                    userData: usercreated
                })
            }
        }
    })
}



function list(req, res){
    var dataUser = req.body; 
    var id = req.params.id; 

    User.find(id, (error, listUser) => {
        if(error){
            res.send({
                message: "Error al conectarnos al servidor",
                statusCode: 500
            })
        }else{
            if(!listUser){
                res.send({
                    message: "Mo fue posible listar a los usuarios",
                    statusCode: 200
                })
            }else{
                res.send({
                    message: "Lista de usuarios",
                    statusCode: 200,
                    dataUser: listUser 
                })
            }
        }
    })
}

function update(req, res){
    var dataUser = req.body; 
    var id = req.params.id;

    User.findByIdAndUpdate(id, dataUser, (error, userUpdate) => {
        if(error){
            res.send({
                message: "Error al conectarnos al servidor",
                statusCode: 500
            })
        }else{
            if(!userUpdate){
                res.send({
                    message: "Error al modificar el usuario",
                    statusCode: 400
                })
            }else{
                res.send({
                    message: "Usuario modificado",
                    statusCode: 200, 
                    dataUser: userUpdate
                })
            }
        }

    })
}

function remove(req, res){
    var id = req.params.id; 

    User.findByIdAndDelete(id, (error, userDeleted) => {
        if (error){
            res.send({
                message: "Error al conectarnos al servidor",
                statusCode: 500
            })
        }else{
            if (!userDeleted){
                res.send({
                    message: "Error al eleiminar el usuario",
                    statusCode: 400
                })
            } else {
                res.send({
                    message: "Usuario eliminado",
                    statusCode: 200, 
                    dataUser: userDeleted 
                })
            }
        }
    })

}

function login(req, res){
    let params = req.body; 

    User.findOne({email: params.email}, (error, userLogged) => {
        if (error){
            res.status(500).send({
                message: "Error en el servidor",
                statusCode: 500
            })
        }else {
            if(!userLogged){
                res.status(200).send({
                    message: "Usuario no existe",
                    statusCode: 400
                })
            }else{
                if (userLogged.password == params.password){
                    res.status(200).send({
                        message: "Bienvenido",
                        statusCode: 200,
                        dataUser: userLogged
                    })
                }else{
                    res.status(200).send({
                        message: "Los datos no coinciden",
                        statusCode: 204
                    })
                }
            }
        }
    })
}

function getUser( req, res){
    var id = req.params.id;
    User.findById(id, (error, allUser) => {
        if (error) {
            res.status(500).send({
                statusCode: 500,
                message: "Error en el servidor"
            })
        } else {
            res.status(200).send({
                statusCode: 200,
                message: "Todos los usuarios",
                allUser: allUser
            })
        }
    } )

}

module.exports = {
    create,
    list, 
    update, 
    remove,
    login,
    getUser
}