const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
    __v: { type: Number, select: false }, // 隐藏mongoose自带的字段
    name: { type: String, required: true },
    age: { type: Number, default: 18 },
    password: { type: String, required: false, select: false },
    avatar_url: { type: String },
    gender: { type: String, enum: ['male', 'female'], defaule: 'male', required: false},
    headline: { type: String },
    locations: { type: [{ type: String }] }, // 字符串数组
    business: { type: String }, // 行业
    employments: { // 职业经历
        type: [{
            company: { type: String },
            job: { type: String }
        }],
        select: false
    },
    educations: {
        type: [{
            school: { type: String },
            major: { type: String },
            diploma: { type: Number }, // 用数字表示学历       
            entrance_year: { type: Number },
            graduation_year: { type: Number }
        }],
        select: false
    }
})

module.exports = model('User', userSchema)