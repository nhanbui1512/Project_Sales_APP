const postSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            console.log(req.IDUser);
            if (result) {
                response.status(200).json({ data: result });
            } else {
                response.status(200).json({ datat: [] });
            }
        });
    }

    CreatePostSales(req, response) {
        const post = {
            id_user: req.body.IDUser,
            title: req.body.title,
            description: req.body.description,
            id_type: req.body.id_type,
        };

        postSales
            .Create({ post: post })
            .then((res) => {
                response.status(200).json({ result: true, message: 'create postsales successful' });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server error' });
            });
    }
}
module.exports = new salesController();
