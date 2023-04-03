const fileSystem = require('fs');

DeleteAvatarFile = ({ fileName }) => {
    return new Promise((resolve, rejects) => {
        fileSystem.unlink(`./src/public/Uploads/Images/${fileName}`, (err, res) => {
            if (err) {
                console.log(err);
                rejects(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = { DeleteAvatarFile };
