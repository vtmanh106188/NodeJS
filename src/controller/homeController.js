import db from '../config/connectDB';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';
import session from 'express-session';
import alert from 'alert';
import nodemailer from 'nodemailer';


// client
let getHomePage = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";
    let sqlProduct = "SELECT * FROM product";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sqlProduct, function (err, listProduct, fields) {
            if(err) throw err;
            //Phân Trang
            let currentPage = 1;
            let perPage = 8; // số SP 1 trang
            let totalPage = 0; // Tổng số trang
            let perProduct = []; // Chứa giá trị của 1 trang

            perProduct = listProduct.slice(
                (currentPage-1)*perPage,
                (currentPage-1)*perPage + perPage,
              )
            
            res.render('index', {listCategoies: listCategoies, listProduct: listProduct, listPro: perProduct})
            console.log(listProduct);
        })
    })
}

//Phân Trang
let getGetPage = (req, res) => {
    console.log(req.params);
    let i = req.params.i;

    let sqlCat = "SELECT * FROM categoies";
    let sqlProduct = "SELECT * FROM product";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sqlProduct, function (err, listProduct, fields) {
            if(err) throw err;

            let currentPage = i;
            let perPage = 8; // số SP 1 trang
            let totalPage = 0; // Tổng số trang
            let perProduct = []; // Chứa giá trị của 1 trang

            perProduct = listProduct.slice(
                (currentPage-1)*perPage,
                (currentPage-1)*perPage + perPage,
              )
            
            res.render('index.ejs', {listCategoies: listCategoies, listProduct: listProduct, listPro: perProduct})
            console.log(listProduct);
        })
    })
}

let getDetailProduct = (req,res) => {
    console.log(req.params);
    let id = req.params.id;
    let sqlCat = "SELECT * FROM categoies";
    let sql = `SELECT * FROM product WHERE idSP = ${id}`;

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sql, function (err, detailProduct, fields) {
            if(err) throw err;
            res.render('detail_product', {listCategoies: listCategoies, detailProduct: detailProduct})
        })
    })
}

let getProductCat = (req, res) => {
    let id = req.params.id;
    let sqlCat = "SELECT * FROM categoies";
    let sqlProCat = `SELECT * FROM product WHERE idCat = ${id}`;

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sqlProCat, function (err, productCat, fields) {
            if(err) throw err;
            res.render('product_cat', {listCategoies: listCategoies, productCat: productCat})
        })
    })
}

let AddToCart = (req, res) => {
    console.log(req);
    let idSP = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart: {});

    db.query(`SELECT * FROM product WHERE idSP=${idSP}`, function(err,product){
        if(err){return res.redirect('/')}
        console.log(product);
        cart.add(product);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/')
    })
}

let trangTimKiem = (req, res) => {
    let sql = "SELECT * FROM categoies";
    db.query(sql, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('pageFind', {listCategoies: listCategoies})
    })
}

let findProducts = (req, res) => {
    console.log(req);
    let nameSP = req.query.nameSP.trim();
    let sql = `SELECT * FROM categoies`
    let sqlFind = `SELECT * FROM product WHERE nameSP LIKE '%${nameSP}%'`;

    db.query(sql, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sqlFind, function (err, listProducts, fields) {
            console.log(listProducts);
            if(err) throw err;
            res.render('find_products', {listCategoies: listCategoies, listProducts: listProducts})
        })
    })
}

//admin
let getAdminHome = (req, res) => {
    res.render('admin/index.ejs')
}

let getAdminListProduct = (req, res) => {
    let sqlProduct = "SELECT * FROM product";

    db.query(sqlProduct, function (err, listProduct, fields) {
        if(err) throw err;
        res.render('admin/list_product.ejs', {listProduct: listProduct})
    })
}

let getAdminAddProduct = (req, res) => {
    let sql = "SELECT * FROM categoies";
    db.query(sql, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('admin/add_product.ejs', {listCategoies: listCategoies})
    })
    
}

let getAdminAddNewProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        console.log(files);
        console.log(fields);
        var oldPath = files.imageSP.filepath;
        var newPath = path.join(__dirname, '../public/img')
                + '/'+files.imageSP.originalFilename
        
        fs.copyFile(oldPath, newPath, (err) => {
            if (err) throw err;
            fs.unlink(oldPath, () => {console.log('Đã xóa file tạm');})
            console.log('Đã upload xong file', files.imageSP.originalFilename);
        })

        let {nameSP, priceSP, detailSP, idCat} = fields;
        let imageSP = files.imageSP.originalFilename;
        
        db.query('INSERT INTO product(nameSP,priceSP,detailSP,idCat,imageSP) VALUES(?,?,?,?,?)', 
            [nameSP,priceSP,detailSP,idCat,imageSP], function (err, addProduct, fields) {
                if(err) throw err;
                res.redirect('/admin/list_product')
            })
    })
}

let getAdminEditProduct = (req, res) => {
    let id = req.params.id;
    let sql = "SELECT nameCat FROM categoies"
    let sqlPro = `SELECT * FROM product INNER JOIN categoies ON product.idCat = categoies.idCat WHERE idSP = ${id}`;

    db.query(sql, function (err, listCategoies, fields) {
        if(err) throw err;
        db.query(sqlPro, function (err, viewProduct, fields) {
            if(err) throw err;
            res.render('admin/edit_product.ejs', {listCategoies: listCategoies, viewProduct: viewProduct[0]})
        })
    })
        
}

let AdminUpdateProduct = (req, res) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        console.log(files);
        console.log(fields);

        if(files.imageSP.originalFilename==''){
            let {nameSP, priceSP, idCat, detailSP, imageSP, idSP} = fields;

            db.query('UPDATE product SET nameSP=?, priceSP=?, idCat=?, detailSP=?, imageSP=? WHERE idSP=?', 
                [nameSP,priceSP,idCat,detailSP,imageSP,idSP], function (err, updateProduct, fields) {
                    console.log(updateProduct);
                    if(err) throw err;
                    res.redirect('/admin/list_product')
                })
        }else{
            var oldPath = files.imageSP.filepath;
            var newPath = path.join(__dirname, '../public/img')
                    + '/' + files.imageSP.originalFilename
            
            fs.copyFile(oldPath, newPath, (err) => {
                if (err) throw err;
                fs.unlink(oldPath, () => {console.log('Đã xóa file tạm');})
                console.log('Đã upload xong file', files.imageSP.originalFilename);
            })

            let {nameSP, priceSP, idCat, detailSP, idSP} = fields;
            let imageSP = files.imageSP.originalFilename;
            
            db.query('UPDATE product SET nameSP=?, priceSP=?, idCat=?, detailSP=?, imageSP=? WHERE idSP=?', 
                [nameSP,priceSP,idCat,detailSP, imageSP, idSP], function (err, updateProduct, fields) {
                    console.log(updateProduct);
                    if(err) throw err;
                    res.redirect('/admin/list_product')
                })
        }
    })
}

let AdminDeleteProduct = (req, res) => {
    console.log(req.body);
    let idSP = req.body.idSP;

    db.query('DELETE FROM product WHERE idSP=?', [idSP], 
        function (err, delProduct, fields) {
            console.log(delProduct);
            if(err) throw err;
            res.redirect('/admin/list_product')
        })
}

let getAdminAddCategoies = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('admin/add_categoies.ejs', {listCategoies: listCategoies})
    })
}

let AdminAddNewCategoies = (req, res) => {
    console.log(req.body);
    let {idCat, nameCat} = req.body;

    db.query('INSERT INTO categoies(idCat,nameCat) VALUES(?,?)', 
            [idCat, nameCat], function (err, addCategoies, fields) {
                console.log(addCategoies);
                if(err) throw err;
                res.redirect('/admin/add_categoies')
            })
}

let AdminEditCategoies = (req, res) => {
    console.log(req.params);
    let idCat = req.params.id;
    let sqlCat = `SELECT * FROM categoies WHERE idCat = ${idCat}`
    db.query(sqlCat, function (err, viewCategoies, fields) {
        if(err) throw err;
        res.render('admin/edit_cat.ejs', {viewCategoies: viewCategoies[[0]]})
    })
}

let AdminUpdateCat = (req, res) => {
    console.log(req.body);
    let idCat = req.body.idCat;
    let nameCat = req.body.nameCat;

    db.query('UPDATE categoies SET nameCat=? WHERE idCat=?', 
                [nameCat, idCat], function (err, updateCat, fields) {
                    console.log(updateCat);
                    if(err) throw err;
                    res.redirect('/admin/add_categoies')
                })
}

let AdminDeleteCat = (req, res) => {
    console.log(req.body);
    let idCat = req.body.idCat;

    db.query('DELETE FROM categoies WHERE idCat=?', [idCat], 
        function (err, delCat, fields) {
            console.log(delCat);
            if(err) throw err;
            res.redirect('/admin/add_categoies')
        })
}

// NEW HOT BEST
let getNewProduct = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('new_product', {listCategoies: listCategoies})
    })
}

let getHotProduct = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('hot_product', {listCategoies: listCategoies})
    })
}

let getBestProduct = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('best_product', {listCategoies: listCategoies})
    })
}

let detailProductAPI = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('detail_productAPI', {listCategoies: listCategoies})
    })
}

let loaiAPI = (req, res) => {
    let sqlCat = "SELECT * FROM categoies";

    db.query(sqlCat, function (err, listCategoies, fields) {
        if(err) throw err;
        res.render('loai_product', {listCategoies: listCategoies})
    })
}

//LOGIN
let trangDangNhap = (req, res) => {
    res.render('dangnhap')
}

let trangDangKy = (req, res) => {
    res.render('dangky')
}

let trangQMK = (req, res) => {
    res.render('quenmatkhau')
}

let sendEmail = (req, res) => {

    let email = req.body.email;
    let sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], function (err, rows) {
        if (err) throw err;

        if (rows.length <= 0) {
            let sess = req.session;
            sess.errorEmail = email;
            alert('Email không tồn tại???')
            res.redirect("/quenmatkhau");
        } else {
            var user = rows[0];
            var result = "";
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;

            for (var i = 0; i < 8; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }

            var salt = bcrypt.genSaltSync(10);
            var pass_mahoa = bcrypt.hashSync(result, salt);

            let sql = `UPDATE users SET password = '${pass_mahoa}' WHERE email = '${email}'`;
            db.query(sql, function (err, rows) {
                if (err) throw err;
                
                var transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: { user: "manhvtps19587@fpt.edu.vn", pass: "vtm188106" },
                    tls: { rejectUnauthorized: false },
                });

                var mailOptions = {
                    from: "manhvtps19587@fpt.edu.vn",
                    to: email,
                    subject: "Đổi mật khẩu",

                    html: `Chào bạn, chúng tôi gửi bạn <br>
                    Username: <p style="color: red">${user.username}</p> <br>
                    Mật khẩu mới là: <p style="color: red">${result}</p>
                    `,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) console.log(error);
                    else console.log("Đã gửi mail: " + info.response);
                    let sess = req.session;
                    sess.successEmail = email;
                    alert('Check mail để lấy mật khẩu mới!!!')
                    res.redirect("/dangnhap");
                });
            });
        }
    });

}

let postNewUser = (req,res) => {
    console.log(req.body);
    let {username, password, email, hoTen} = req.body;

    var salt = bcrypt.genSaltSync(10);
    var pass_mahoa = bcrypt.hashSync(password, salt);
    console.log(pass_mahoa);

    let user_infor = {username: username, password: pass_mahoa, email: email, hoTen: hoTen};
    let sql = `INSERT INTO users SET ?`;

    db.query(sql, user_infor, (err, newUser, fields) => {
            if(err) throw err;
            alert('Đăng ký tài khoản thành công!!!')
            res.redirect('/dangnhap')
        })

}

let dangNhap = (req, res) => {
    console.log(req.body);
    let {username, password} = req.body;
    let sql = `SELECT * FROM users WHERE username = ?`;

    db.query(sql, [username], (err, userLogin) => {
        console.log(userLogin);
        if(userLogin.length <= 0){
            alert('Tên đăng nhập không tồn tại?');
            res.redirect('/dangnhap');
            return;
        }else if(userLogin[0].username == 'admin'){
            res.redirect('/admin')
        }else{

            let user = userLogin[0];``
            let pass_fromdb = user.password;

            var kq = bcrypt.compareSync(password, pass_fromdb);
            if (kq){ 
                var sess = req.session;
                sess.daDangNhap = true;
                sess.idUser = user.idUser;
                sess.username = user.username;
                sess.password = user.password;
                sess.email = user.email;
                sess.hoTen = user.hoTen;
                sess.soThich = user.soThich;

                if (!sess.back == ''){ 
                    console.log(sess.back);
                    alert('Đăng nhập thành công!');
                    res.redirect(sess.back);
                }
                else {
                    alert('Đăng nhập thành công!');
                    res.redirect('/user_infor');
                }
            }   
            else {
                alert('Sai mật khẩu?');
                res.redirect('/dangnhap');
            }
        }
    })
}

let userInfor = (req, res) => {
    if (req.session.daDangNhap) {
        let {username, password, email, hoTen, soThich} = req.session;
        res.render('user_infor',{data: req.session})
    }
    else {  
        req.session.back = "/user_infor";    
        res.redirect('/dangnhap')
    }
}

let changePassword = (req, res) => {
    if (req.session.daDangNhap) {
        res.render('change_password',{data: req.session})
        console.log(data);
    }
}

let doiMatKhau = (req, res) => {
    let {idUser, username, password_old, password_new, re_password} = req.body;
    console.log(req.body);
    let sql = `SELECT * FROM users WHERE idUser = ?`;
    let sqlUpdate = `UPDATE users SET password =? WHERE idUser =?`;

    db.query(sql, [idUser], (err, userLogin) => {

        let user = userLogin[0];
        let pass_fromdb = user.password;
        console.log(user);

        var kq = bcrypt.compareSync(password_old, pass_fromdb);

        if(kq){
            if(password_new == re_password){
                var salt = bcrypt.genSaltSync(10);
                var pass_mahoa = bcrypt.hashSync(password_new, salt);
                console.log(pass_mahoa);
                db.query(sqlUpdate, [pass_mahoa, idUser],  (err, updatePass) => {
                    alert('Đổi mật khẩu thành công!');
                    res.redirect('/user_infor')
                })
            }else{
                alert('Mật khẩu không trùng khớp?')
                res.redirect('/change_pass')
            }
        }else{
            alert('Mật khẩu sai???');
            res.redirect('/change_pass')
        }
    })

}

let getListUsers = (req, res) => {
    res.render('admin/list_users.ejs')
}

module.exports = {
    getHomePage, getDetailProduct, getProductCat, AddToCart, getGetPage, trangTimKiem, findProducts,
    sendEmail,

    getAdminHome, getAdminListProduct, getAdminAddProduct, getAdminAddNewProduct, getAdminEditProduct,
    AdminUpdateProduct, AdminDeleteProduct, 
    
    getAdminAddCategoies, AdminAddNewCategoies, AdminEditCategoies, AdminUpdateCat, AdminDeleteCat,

    getNewProduct, getHotProduct, getBestProduct, detailProductAPI, loaiAPI,

    trangDangNhap, trangDangKy, trangQMK,
    postNewUser, dangNhap, getListUsers, userInfor, changePassword, doiMatKhau
}