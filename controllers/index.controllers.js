const conexion = require('../db/database');

class index {

    // Index
    index(req,res){
        conexion.query('SELECT * FROM blog',(error,resultsBlogs)=>{
            if(error){
                console.log(error);
                return res.send(error);
            }else{
                conexion.query('SELECT * FROM evento',(error,resultsEvents)=>{
                    res.render('index',({
                        layout: false,
                        Blogs: resultsBlogs,
                        Events: resultsEvents
                    }));
                });
            };
        });
        
    };

    // Eventos
   eventos(req,res){
        conexion.query("SELECT * FROM evento",(error,results,next)=>{
            if(error){
                res.send(error);
                next();
            }else{
                res.render('events',({
                    layout: false,
                    eventos:results
                }));
            }
        });
    };
    evento(req,res){
        // console.log(req.params.seo_url);
        // console.log(req.params);
        // const seo_url = req.params.seo_url;
        // console.log(seo_url);
        const id = req.query.id;
       
        conexion.query('SELECT * FROM evento WHERE id_evento = ?',[id],(error,result)=>{
            if(error){
                console.log(error);
                // res.status(404).redirect('/events',({
                //     error: error
                // }));
            }else{
                // console.log(result[0].urlSeo_evento);
                res.status(200).render('evento',({
                    layout: false,
                    evento: result[0]
                }));
            }
        });
    };
    // Blogs
   blogs(req,res){
        conexion.query("SELECT * FROM blog",(error,results,next)=>{
            if(error){
                res.send(error);
                next();
            }else{
                res.render('blogs',({
                    layout: false,
                    blogs:results
                }));
            }
        });
    };
    blog(req,res){
        const id = req.query.id;
        conexion.query("SELECT * FROM blog WHERE id_blog  = ?",[id],(error,result)=>{
            if(error){

            }else{
                res.render('blog',({
                    layout: false,
                    blog: result[0]
                }));
            }
        });
        // res.render('blog',({
        //     layout: false
        // }))
    }
    login(req,res){
        res.render('login',({
            layout: false
        }))
    }
}

module.exports = new index();