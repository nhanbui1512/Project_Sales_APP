const commentModel = require('../Model/comment.model');

class homeController {
    //GET /news
    findCommentsByIdPost(req, response) {
        const IDPost = req.query.id_post;
        console.log(IDPost);
        commentModel
            .FindByPost({ IDPost: IDPost })
            .then((res) => {
                response.status(200).json({ data: res });
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ message: 'server error' });
            });
    }
}
module.exports = new homeController();
