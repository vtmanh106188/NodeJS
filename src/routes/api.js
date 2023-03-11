import express from 'express';
import APIController from '../controller/APIController'

let router = express.Router();

const initAPIRoute = (app) => {
    // Product new hot best
    router.get('/list_product', APIController.listProduct)
    router.get('/new_product', APIController.newProduct);
    router.get('/hot_product', APIController.hotProduct);
    router.get('/best_product', APIController.bestProduct);
    router.get('/detail_product/:id', APIController.detailProductAPI);
    router.get('/api_loai/:id', APIController.loaiSP);

    //Login
    router.get('/new_user', APIController.newUser);

    router.get('/list_users', APIController.listUsers)

    return app.use('/api', router); 
}

export default initAPIRoute;