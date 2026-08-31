const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        lowercase: true,   // "Mumbai" ho ya "mumbai", DB mein hamesha lowercase save hoga — filter match reliably chalega
        trim: true
    },
    beds: {
        type: Number,
        required: true
    },
    baths: {
        type: Number,
        required: true
    },
    sqft: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
}, { timestamps: true });

const MyModel = mongoose.model('Properties', schema);

module.exports = MyModel;