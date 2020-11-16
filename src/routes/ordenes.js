const { Router, json } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const orders = require('../datos/ordenes.json');
//const { request } = require('http');

//Get
router.get('/', (req, res) => {
    res.json(orders);
});

//Post
router.post('/', (req, res) => {
    const {cliente, orden, mesa, total} = req.body;
    if (cliente && orden && mesa && total) {
        const id = orders.length + 1;
        const newOrder = { id, ...req.body };
        orders.push(newOrder);
        const json_orders = JSON.stringify(orders);
        fs.writeFileSync('src/datos/ordenes.json', json_orders, 'utf-8');
        res.json(orders);
        
    } else {
        res.send('Error');
    }
    res.send('Recibido');
});

//Delete
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(orders, (order, i) => {
        if (order.id == id) {
            orders.splice(i, 1);
            res.send('Eliminado');
            const json_orders = JSON.stringify(orders);
            fs.writeFileSync('src/datos/ordenes.json', json_orders, 'utf-8');
        }
    });
    res.send(orders);
});

//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {cliente, orden, mesa, total} = req.body;
    if (cliente && orden && mesa && total) {
        _.each(orders, (order, i) => {
            if (order.id == id) {
                order.cliente = cliente;
                order.orden = orden;
                order.mesa = mesa;
                order.total = total;
                const json_orders = JSON.stringify(orders);
                fs.writeFileSync('src/datos/ordenes.json', json_orders, 'utf-8');
                res.json('Modificado');
                res.json(orders);
            }
        });
        
    } else {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
    
});


module.exports = router;