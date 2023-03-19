const db = require('../../Config/Db');

const PostSales = function (post) {
    this.IDPost = post.IDPost
    this.Titile = post.Titile
    this.Description = post.Description
    this.CreateAt = post.CreateAt
    this.UpdateAt = post.UpdateAt
    this.IDUser = post.IDUser
};

PostSales.GetAll = (result)=>{
    db.query('SELECT * FROM postsales', (err, res) =>{
        if(err){
            console.log(err)
            result(null)
        }
        else{
            result(res)
        }
    })
}
module.exports = PostSales;
