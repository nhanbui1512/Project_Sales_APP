const accessAdmin = (req, response, next) => {
    const access = req.access;
    console.log(access);
    if (access == 0) {
        next();
    } else {
        response.status(200).json({ result: false, message: 'API cần đăng nhập vào quyền admin' });
        return;
    }
};
module.exports = accessAdmin;
