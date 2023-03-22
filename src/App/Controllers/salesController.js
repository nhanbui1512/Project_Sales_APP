const postSales = require('../Model/postsales.model');
const Image = require('../Model/image.model');
const PostSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            if (result) {
                return response.status(200).json({ data: result });
            } else {
                return response.status(200).json({ datat: [] });
            }
        });
    }

    // Find a post by id
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

    // Add a post
    CreatePostSales(req, response) {
        const files = req.files;

        const post = {
            id_user: req.IDUser,
            title: req.body.title,
            description: req.body.description,
            id_type: req.body.id_type,
        };
        let accuser = req.access;
        if (accuser != 1) {
            postSales
                .Create({ post: post })
                .then((res) => {
                    const idPost = res.insertId;
                    return idPost;
                })
                .then((idPost) => {
                    console.log(idPost);

                    Image.CreateMultiImage({ files: files, postID: idPost })
                        .then(() => {
                            response.status(200).json({ result: true, message: 'Successful' });
                        })
                        .catch((err) => {
                            response
                                .status(501)
                                .json({ result: false, message: 'Create Image is not successful' });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    return response.status(500).json({ result: false, message: 'Server error' });
                });
        } else {
            return response
                .status(500)
                .json({ result: false, message: 'Bạn không có quyền đăng bài' });
        }
    }

    // Delete a post
    DelPost(req, response) {
        const postID = req.query.id_post;
        Image.DeleteImagesByPostID({ postID: postID })
            .then(() => {
                PostSales.Delete({ postID: postID })
                    .then(() => {
                        response
                            .status(200)
                            .json({ result: true, message: 'Delete post successful' });
                    })
                    .catch((err) => {
                        console.log(err);
                        response
                            .status(501)
                            .json({ result: false, message: 'Delete post not successful' });
                    });
            })
            .catch((err) => {
                console.log(err);
                response
                    .status(501)
                    .json({ result: false, message: 'Delete images of post is not successful' });
            });
    }
}
module.exports = new salesController();
