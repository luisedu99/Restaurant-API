const { Router, json } = require('express');
const router = Router();
const _ = require('underscore');
const fs = require('fs');

const meals = require('../datos/menu.json');
//console.log(meals);

//GET
router.get('/', (req, res) => {
    res.json(meals);
});

//POST
router.post('/', (req, res) => {
    const { titulo, descripcion, imagen, precio } = req.body;
    if (titulo && descripcion && imagen && precio) {
        const id = meals.length + 1;
        const newMeal = { id, ...req.body };
        meals.push(newMeal);

        const json_meals = JSON.stringify(meals);
        fs.writeFileSync('src/datos/menu.json', json_meals, 'utf-8');
        res.json('Guardado');

        res.json(meals);
    } else {
        res.send('Error');
    }
    res.send('Recibido');
});

//DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    _.each(meals, (meal, i) => {
        if (meal.id == id) {
            meals.splice(i, 1);
            res.send('Eliminado');
            const json_meals = JSON.stringify(meals);
            fs.writeFileSync('src/datos/menu.json', json_meals, 'utf-8');
        }
    });
    res.send(meals);
});

//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, descripcion, imagen, precio } = req.body;
    if (titulo && descripcion && imagen && precio) {
        _.each(meals, (meal, i) => {
            if (meal.id == id) {
                meal.titulo = titulo;
                meal.descripcion = descripcion;
                meal.imagen = imagen;
                meal.precio = precio;

                const json_meals = JSON.stringify(meals);
                fs.writeFileSync('src/datos/menu.json', json_meals, 'utf-8');
                res.json('Modificado');
            }
        });
        res.json(meals);
    } else {
        res.status(500).json({ error: 'Ocurrio un error' });
    }
});

module.exports = router;