const { Router, json } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const clients = require('../datos/clients.json');
const { request } = require('http');
//console.log(clients);

//GET
router.get('/', (req, res) => {
    res.json(clients);
});


//POST
router.post('/', (req, res) => {
    const { nombre, apellido, correo, password, telefono, nacimiento } = req.body;
    if (nombre && apellido && correo && password && telefono && nacimiento) {
        const id = clients.length + 1;
        const newClient = { id, ...req.body };
        clients.push(newClient);

        const json_clients = JSON.stringify(clients);
        fs.writeFileSync('src/datos/clients.json', json_clients, 'utf-8');

       //res.json({success:true, data: []});
    } else {
        //res.send({success:false, message: "Error to save client", errorCode: 4});
        
    }
    //res.send('Recibido');
});

//DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(clients, (client, i) => {
        if (client.id == id) {
            clients.splice(i, 1);
            res.send('Eliminado');
            const json_clients = JSON.stringify(clients);
            fs.writeFileSync('src/datos/clients.json', json_clients, 'utf-8');
        }
    });
    res.send(clients);
});

//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, password, telefono, nacimiento } = req.body;
    if (nombre && apellido && correo && password && telefono && nacimiento) {
        _.each(clients, (client, i) => {
            if (client.id == id) {
                client.nombre = nombre;
                client.apellido = apellido;
                client.correo = correo;
                client.password = password;
                client.telefono = telefono;
                client.nacimiento = nacimiento;

                const json_clients = JSON.stringify(clients);
                fs.writeFileSync('src/datos/clients.json', json_clients, 'utf-8');
                res.json('Modificado');
            }
        });
        res.json(clients);
    } else {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
});


module.exports = router;