const commentModel = require('../Model/comment.model');

class homeController {
    //GET /news
    findCommentsByIdPost(req, response) {
        const IDPost = req.params.idpost;
        console.log(IDPost);
        commentModel
            .FindByPost({ IDPost: IDPost })
            .then((res) => {
                return response.status(200).json({ data: res });
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ message: 'server error' });
            });
    }
    createComment(req, response) {
        const content = req.body.content;
        const IDPost = req.params.idpost;
        const IDUser = req.IDUser;
        commentModel
            .create_cmt({ IDPost, IDUser, content })
            .then((res) => {
                return response.status(200).json({ message: 'create comment successful' });
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ message: 'server error' });
            });
    }
    updateComment(req, response) {
        const content = req.body.content;
        const IDComment = req.params.idcomment;
        const IDUser = req.IDUser;

        commentModel
            .getInformation({ IDComment })
            .then((res) => {
                if (res[0].IDUser == IDUser) {
                    commentModel
                        .update_cmt({ IDComment, content })
                        .then((res) => {
                            return response
                                .status(200)
                                .json({ message: 'update comment successful' });
                        })
                        .catch((err) => {
                            console.log(err);
                            return response.status(500).json({ message: 'server error' });
                        });
                } else {
                    return response
                        .status(400)
                        .json({ message: 'you are not the owner of this comment' });
                }
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ message: 'server error' });
            });
    }
    deleteComment(req, response) {
        const IDComment = req.params.idcomment;
        const IDUser = req.IDUser;
        console.log(IDComment);
        commentModel
            .getInformation({ IDComment })
            .then((res) => {
                if (res[0].IDUser == IDUser) {
                    commentModel
                        .delete_cmt({ IDComment })
                        .then((res) => {
                            return response
                                .status(200)
                                .json({ message: 'delete comment successful' });
                        })
                        .catch((err) => {
                            console.log(err);
                            return response.status(500).json({ message: 'server error' });
                        });
                } else {
                    return response
                        .status(400)
                        .json({ message: 'you are not the owner of this comment' });
                }
            })
            .catch((err) => {
                console.log(err);
                return response.status(500).json({ message: 'server error' });
            });
    }
}
module.exports = new homeController();
