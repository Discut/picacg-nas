const express = require('express');
const user = require('./user');
const comic = require('./comic');
const system = require('./system')
module.exports = {
    register: (_app) => {
        user(_app);
        comic(_app);
        system(_app);
    }
}