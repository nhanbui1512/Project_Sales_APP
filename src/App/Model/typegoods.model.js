const db = require('../../Config/Db');

const Type = (type) => {
    this.IDType = type.IDType;
    this.typeName = type.typeName;
};

Type.getall = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM typegoods', (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = Type;
