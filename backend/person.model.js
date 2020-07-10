const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Person = new Schema({
    company_id: {
        type: String
    },
    first_name: {
        type: String
    },
    password: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    diagnosed_with_covid: {
        type: Boolean
    },
    recovered_from_covid: {
        type: Boolean
    },
    list_of_ids_exposed: {
        type: Array
    }
});

module.exports = mongoose.model('Person', Person);

