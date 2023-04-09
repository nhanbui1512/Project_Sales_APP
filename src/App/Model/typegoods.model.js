const db = require('../../Config/Db');

const Type = (type) => {
    this.IDType = type.IDType;
    this.nameType = type.nameType;
    this.iconPath = type.iconPath;
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

Type.insert = ({ nameType, fileName }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `INSERT INTO typegoods (NameType,IconPath) VALUES ('${nameType}','${fileName}')`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
};

Type.update = ({ nameType, idType }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE typegoods SET NameType='${nameType}' WHERE IDType = ${idType}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
};

Type.updateIcon = ({ nameFile, idType }) => {
    return new Promise((resolve, reject) => {
        db.query(
            `UPDATE typegoods SET IconPath='${nameFile}' WHERE IDType = ${idType}`,
            (err, res) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(res);
                }
            },
        );
    });
};

module.exports = Type;
