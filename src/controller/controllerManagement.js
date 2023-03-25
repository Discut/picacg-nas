const express = require('express');
const user = require('./user');
module.exports = {
    register: (_app) => {
        user(_app);
    }
}