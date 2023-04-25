const postSales = require('../Model/postsales.model');
const Image = require('../Model/image.model');
const PostSales = require('../Model/postsales.model');
class salesController {
    //GET all sales post
    GetAll(req, response) {
        postSales.GetAll((result) => {
            if (result) {
                var newResult = [];

                for (let i = 0; i < result.length; i++) {
                    const element = result[i];
                    Image.getImagesByPost({ idPost: element.IDPost })
                        .then((images) => {
                            images = images.map((image) => {
                                image.Path = `/uploads/images/${image.Path}`;
                                return image;
                            });
                            element.images = images;
                            return element;
                        })
                        .then((element) => {
                            newResult.push(element);
                        });
                }

                setTimeout(() => {
                    return response.status(200).json({ result: true, data: newResult });
                }, 500);
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
            price: req.body.price,
            discount: req.body.discount,
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
                    Image.CreateMultiImage({ files: files, postID: idPost })
                        .then(() => {
                            response.status(200).json({ result: true, message: 'Successful' });
                        })
                        .catch((err) => {
                            response.status(501).json({ result: false, message: 'Create Image is not successful' });
                        });
                })
                .catch((err) => {
                    console.log(err);
                    return response.status(500).json({ result: false, message: 'Server error' });
                });
        } else {
            return response.status(500).json({ result: false, message: 'Bạn không có quyền đăng bài' });
        }
    }

    UpdatePost(req, response) {
        const idUser = req.IDUser;

        const post = {
            idPost: req.body.idPost,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
        };

        postSales
            .Update({ post, idUser })
            .then((res) => {
                console.log(res);
                response.status(200).json({ result: true, message: 'update post successful' });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'update post not successful' });
            });
    }

    // Delete a post
    DelPost(req, response) {
        const postID = req.query.id_post;
        Image.DeleteImagesByPostID({ postID: postID })
            .then(() => {
                PostSales.Delete({ postID: postID })
                    .then(() => {
                        response.status(200).json({ result: true, message: 'Delete post successful' });
                    })
                    .catch((err) => {
                        console.log(err);
                        response.status(501).json({ result: false, message: 'Delete post not successful' });
                    });
            })
            .catch((err) => {
                console.log(err);
                response.status(501).json({ result: false, message: 'Delete images of post is not successful' });
            });
    }

    GetRand(req, response) {
        const randNumber = req.query.rand_number;
        PostSales.getRand({ randNumber })
            .then((posts) => {
                if (posts) {
                    var newResult = [];

                    for (let i = 0; i < posts.length; i++) {
                        const element = posts[i];
                        Image.getImagesByPost({ idPost: element.IDPost })
                            .then((images) => {
                                images = images.map((image) => {
                                    image.Path = `/uploads/images/${image.Path}`;
                                    return image;
                                });
                                element.images = images;
                                return element;
                            })
                            .then((element) => {
                                newResult.push(element);
                            });
                    }

                    setTimeout(() => {
                        return response.status(200).json({ result: true, data: newResult });
                    }, 500);
                } else {
                    return response.status(200).json({ datat: [] });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(401).json({ result: false, message: err.sqlMessage });
            });
    }

    FindPostsByTypeID(req, response) {
        const idType = req.query.id_type;

        PostSales.getByTypeID({ IDType: idType })
            .then((posts) => {
                if (posts) {
                    var newResult = [];

                    for (let i = 0; i < posts.length; i++) {
                        const element = posts[i];
                        Image.getImagesByPost({ idPost: element.IDPost })
                            .then((images) => {
                                images = images.map((image) => {
                                    image.Path = `/uploads/images/${image.Path}`;
                                    return image;
                                });
                                element.images = images;
                                return element;
                            })
                            .then((element) => {
                                newResult.push(element);
                            });
                    }

                    setTimeout(() => {
                        return response.status(200).json({ result: true, data: newResult });
                    }, 500);
                } else {
                    return response.status(200).json({ result: true, datat: [] });
                }
            })
            .catch((err) => {
                console.log(err);
                response.status(500).json({ result: false, message: 'Server is error' });
            });
    }

    FindIncludeName(req, response) {
        const name = req.query.name;
        PostSales.findIncludeName({ name })
            .then((posts) => {})
            .catch(err);
    }
}
module.exports = new salesController();
