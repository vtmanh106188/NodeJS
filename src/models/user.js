import db from '../config/connectDB'

exports.list = (callback) => {
    let sql = 'SELECT * FROM users';

    db.query(sql, (err,listUsers) =>{callback(listUsers)})
}

exports.create = (data, callback) => {
    let sql = 'INSERT INTO users SET ?';

    db.query(sql, data, (err,newUser) =>
    {    if (err) throw err;
        callback(newUser)})
}

exports.update = (id, data, callback) => { 
    let sql = 'UPDATE users  SET ? WHERE idUser = ?';

    db.query(sql, [data, id], (err, updateUser) => {
        if (err) throw err;
        callback();
    });    
}

exports.read = (id, callback) => {
    let sql = 'SELECT * FROM users WHERE idUser = ?';  

    db.query(sql, id, (err, data) => {
        let detailUser = data[0]; 
        callback(detailUser);
    });
}

exports.delete = (id, callback) => {
    let sql = 'DELETE FROM users WHERE idUser = ?';

    db.query(sql, id, (err, deleteUser) => {
        if (err) throw err;
        callback();
    });    
}