import db from '../config/connectDB';
import modelProduct from '../models/product';
import modelUser from '../models/user';

//PRODUCT NEW HOT BEST

let listProduct = (req, res) => {
    modelProduct.list((listProduct) => {res.json(listProduct)})
}

let newProduct = (req, res) => {
    modelProduct.new((listNew) => {res.json(listNew)})
}

let hotProduct = (req, res) => {
    modelProduct.hot((listHot) => {res.json(listHot)})
}

let bestProduct = (req, res) => {
    modelProduct.best((listBest) => {res.json(listBest)})
}

let detailProductAPI = (req, res) => {
    let id = req.params.id;

    modelProduct.detail(id, (detailProduct) => {
        res.json(detailProduct)
    })
}

let loaiSP = (req, res) => {
    let id = req.params.id;

    modelProduct.loai(id, (loaiSP) => {
        res.json(loaiSP)
    })
}

// LOGIN

let newUser = (req, res) => {
    modelUser.create((newUser) => {res.json(newUser)})
}

// USERS
let listUsers = (req, res) => {
    modelUser.list((listUsers) => {res.json(listUsers)})
}

module.exports = {
    newProduct, hotProduct ,bestProduct, detailProductAPI, loaiSP, listProduct,

    newUser, 
    
    listUsers
}