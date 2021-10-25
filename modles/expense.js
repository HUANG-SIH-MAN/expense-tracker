const mongoose = require('mongoose')
const Schema = mongoose.Schema
const expenseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    //等實作出登入功能在加入(為了方便測試CRUD功能)
    // userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     index: true,
    //     required: true
    // },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true
    }
})

module.exports = mongoose.model('expense', expenseSchema)