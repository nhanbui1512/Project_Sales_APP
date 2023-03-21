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
    createComment(req, response) {
        const content = req.body.content;
        const IDPost = req.params.idpost;
        const IDUser = req.body.IDUser;
        console.log(content, IDPost, IDUser);
        commentModel.create_cmt({ IDPost, IDUser,content}).then((res) => {
            response.status(200).json({ message: 'create comment successful' });
        }
        ).catch((err) => {
            console.log(err);
            response.status(500).json({ message: 'server error' });
        });
    }
}
module.exports = new homeController();
