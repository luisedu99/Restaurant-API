const { Router, json } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const reservations = require('../datos/reservaciones.json');
//const { request } = require('http');

//Get
router.get('/', (req, res) => {
    res.json(reservations);
});


//Post
router.post('/', (req, res) => {
    console.log(req.body);
    const {idcliente, numeropersonas, fecha, hora } = req.body;

    if (idcliente && numeropersonas && fecha && hora) {
        const id = reservations.length + 1;

        const newReservation = { id, idcliente, numeropersonas, fecha, hora };
        reservations.push(newReservation);

        const json_reservations = JSON.stringify(reservations);
        fs.writeFileSync('src/datos/reservaciones.json', json_reservations, 'utf-8');

        res.json(reservations);
        
    } else {
        res.send({message:'Error'});
    }
    res.send('Recibido');
});

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const filterReservations = reservations.filter(reservation => reservation.id != id);
    
    const jsonReservations = JSON.stringify(filterReservations);
    updateReservations(jsonReservations);    
    //res.send(reservations);
});

//Get reservaciones con filtro
router.get('/:idcliente', (req, res) => {
    var id = req.params.idcliente;
    const result = reservations.filter(index => index.idcliente == id);
    res.send(result)
});


//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { idcliente, numeropersonas, fecha, hora } = req.body;

    if (idcliente && numeropersonas && fecha && hora) {
        _.each(reservations, (reservation, i) => {
            if (reservation.id == id) {
                reservation.idcliente = idcliente;
                reservation.numeropersonas = numeropersonas;
                reservation.fecha = fecha;
                reservation.hora = hora;               
                
                const json_reservations = JSON.stringify(reservations);
                fs.writeFileSync('src/datos/reservaciones.json', json_reservations, 'utf-8');

                res.json('Modificado');
                //res.json(reservations);
            }
        });
        
    } else {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
    
});

function updateReservations(jsonReservations){
    fs.writeFileSync('src/datos/reservaciones.json', jsonReservations, 'utf-8');
}


module.exports = router;