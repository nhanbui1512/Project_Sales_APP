class homeController { 

    //GET /news
    index(req, res){
        res.send('hello')
    }
    
}
module.exports = new homeController;