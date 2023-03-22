

const db = require('../../Config/Db');

const accessrequest = function(accessrequest){
    this.IDUser = accessrequest.IDUser;
    this.requestAccess = accessrequest.requestAccess;
    this.ID_access = accessrequest.ID_access;
}


accessrequest.registerSales = ({id}) =>
{
    return new Promise((resolve, reject) => {
        db.query(`INSERT INTO accessrequest(IDUser,requestAccess) VALUES ('${id}',1)`, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("success");
                resolve(res);
            }
        });
    });
}
accessrequest.getallrequest = () =>
{
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM accessrequest`, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("get all request");
                resolve(res);
            }
        });
    });
}
accessrequest.findbyiduser = ({id}) =>
{
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM accessrequest WHERE IDUser = '${id}'`, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("get by userid = " + id);
                resolve(res);
            }
        });
    });
}
accessrequest.updateAccess =(id) =>
{
    return new Promise((resolve, reject) => {
        db.query(`UPDATE accessrequest SET requestAccess = 0 WHERE IDUser = '${id}'`, (err, res) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("UPDATE accessrequest SET requestAccess = 0 WHERE IDUser = " + id);
                resolve(res);
            }
        });
    });
}

module.exports = accessrequest;

