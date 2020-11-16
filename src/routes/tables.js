const { Router, json } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const tables = require('../datos/tables.json');
//console.log(tables);

//GET
router.get('/', (req, res) => {
    res.json(tables);
});

//POST
router.post('/', (req, res) => {
    const { capacidad, descripcion } = req.body;
    if (capacidad && descripcion) {
        const id = tables.length + 1;
        const newTable = { id, ...req.body };
        tables.push(newTable);

        const json_tables = JSON.stringify(tables);
        fs.writeFileSync('src/datos/tables.json', json_tables, 'utf-8');

        res.json(tables);
    } else {
        res.send('Error');
    }
    res.send('Recibido');
});

//DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(tables, (table, i) => {
        if (table.id == id) {
            tables.splice(i, 1);
            res.send('Eliminado');
            const json_tables = JSON.stringify(tables);
            fs.writeFileSync('src/datos/tables.json', json_tables, 'utf-8');
        }
    });
    res.send(tables);
});

//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { capacidad, descripcion } = req.body;
    if (capacidad && descripcion) {
        _.each(tables, (table, i) => {
            if (table.id == id) {
                table.capacidad = capacidad;
                table.descripcion = descripcion;

                const json_tables = JSON.stringify(tables);
                fs.writeFileSync('src/datos/tables.json', json_tables, 'utf-8');
                res.json('Modificado');
            }
        });
        res.json(tables);
    } else {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
});


module.exports = router;

