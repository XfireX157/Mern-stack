import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
    img:{
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    price: {
        type: String,
        required: true
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }
}, { collection : 'news'})

export const News = mongoose.model('news', NewsSchema)