import express from "express";
import homeController from '../controller/homeController';
let router = express.Router();

const initWebRoute = (app) => {
    // client
    router.get('/', homeController.getHomePage);
    router.get('/detail_product/:id', homeController.getDetailProduct);
    router.get('/product_cat/:id', homeController.getProductCat);
    router.get('/getPage/:i', homeController.getGetPage);

    router.get('/add_to_cart/:id', homeController.AddToCart);

    router.get('/trangtimkiem', homeController.trangTimKiem);
    router.get('/find_products', homeController.findProducts);
    //admin
    router.get('/admin/', homeController.getAdminHome);

    router.get('/admin/list_product', homeController.getAdminListProduct);
    router.get('/admin/add_product', homeController.getAdminAddProduct);
    router.post('/admin/add_new_product', homeController.getAdminAddNewProduct);
    router.get('/admin/edit_product/:id', homeController.getAdminEditProduct);
    router.post('/admin/update_product', homeController.AdminUpdateProduct);
    router.post('/admin/delete_product', homeController.AdminDeleteProduct);

    router.get('/admin/add_categoies', homeController.getAdminAddCategoies);
    router.post('/admin/add_new_categoies', homeController.AdminAddNewCategoies);
    router.get('/admin/edit_categoies/:id', homeController.AdminEditCategoies);
    router.post('/admin/update_cat', homeController.AdminUpdateCat);
    router.post('/admin/delete_cat', homeController.AdminDeleteCat);

    //new hot best
    router.get('/new_product', homeController.getNewProduct);
    router.get('/hot_product', homeController.getHotProduct);
    router.get('/best_product', homeController.getBestProduct);
    router.get('/detail_productAPI/:id', homeController.detailProductAPI);
    router.get('/api_loai/:id', homeController.loaiAPI);

    //login
    router.get('/dangnhap', homeController.trangDangNhap);
    router.get('/dangky', homeController.trangDangKy);
    router.get('/quenmatkhau', homeController.trangQMK);
    router.post('/send_email', homeController.sendEmail);

    router.post('/new_user', homeController.postNewUser);
    router.post('/dangnhap', homeController.dangNhap);

    router.get('/list_users', homeController.getListUsers);
    router.get('/user_infor', homeController.userInfor);
    router.get('/change_pass', homeController.changePassword);
    router.post('/doimatkhau', homeController.doiMatKhau);

    return app.use('/', router);
}

export default initWebRoute;