const postSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            if (result) {
                response.status(200).json({ data: result });
                console.log(req.body.access);
                console.log(req.body.user_name);
                console.log(req.body.IDUser)
            } else {
                response.status(200).json({ datat: [] });
            }
        });
    }

    FindByID(req, response) {
        const id = req.query.id;
        postSales
            .Find({ id })
            .then((res) => {
                response.status(200).json({ data: res });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ message: 'server error' });
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
