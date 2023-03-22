const postSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            if (result) {
                return response.status(200).json({ data: result });
                console.log(req.body.access);
                console.log(req.body.user_name);
                console.log(req.body.IDUser)
            } else {
                return response.status(200).json({ datat: [] });
            }
        });
    }

    FindByID(req, response) {
        const id = req.query.id;
        postSales
            .Find({ id })
            .then((res) => {
                return response.status(200).json({ data: res });
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ message: 'server error' });
            });
    }

    CreatePostSales(req, response) {
        const files = req.files;
        paths = [];
        for (let i = 0; i < files.length; i++) {
            // Lấy ra url ảnh
        }
        const post = {
            id_user: req.IDUser,
            title: req.body.title,
            description: req.body.description,
            id_type: req.body.id_type,
        };
        let accuser = req.body.access;
        if(accuser != 1){
        postSales
            .Create({ post: post })
            .then((res) => {
                return response.status(200).json({ result: true, message: 'create postsales successful' });
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ result: false, message: 'Server error' });
            });
        }else
        {
            return response.status(500).json({ result: false, message: 'Bạn không có quyền đăng bài' });
        }
    }
}
module.exports = new salesController();
