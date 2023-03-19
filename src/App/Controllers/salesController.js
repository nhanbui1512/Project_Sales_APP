const postSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            if (result) {
                response.status(200).json({ data: result });
            } else {
                response.status(200).json({ datat: [] });
            }
        });
    }

    CreatePostSales(req, response) {
        postSales.Create();
    }
}
module.exports = new salesController();
