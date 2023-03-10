import db from '../config/connectDB';

exports.new = (callback) => {
    let sql = 'SELECT * FROM product ORDER BY newSP DESC LIMIT 4';
    db.query(sql, (err,listNew) =>{callback(listNew)})
}

exports.hot = (callback) => {
    let sql = 'SELECT * FROM product WHERE hotSP = 1 LIMIT 4';
    db.query(sql, (err,listHot) =>{callback(listHot)})
}

exports.best = (callback) => {
    let sql = 'SELECT * FROM product ORDER BY bestSP DESC LIMIT 4';
    db.query(sql, (err,listBest) =>{callback(listBest)})
}

exports.detail = (id, callback) => {
    let sql = 'SELECT * FROM product WHERE idSP = ?';  

    db.query(sql, id, (err, data) => {
        let detailProduct = data[0]; 
        callback(detailProduct);
    });
}

exports.loai = (id, callback) => {
    let sql = 'SELECT * FROM product WHERE idCat = ?';

    db.query(sql, id, (err, loaiSP) => {
        callback(loaiSP);
    });
}