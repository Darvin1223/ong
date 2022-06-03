const conexion = require('../db/database');
const bcryptjs = require('bcryptjs');
const { convert } = require('html-to-text');
const slug = require('slug');

class Admin {

    Home(req,res){
        conexion.query('SELECT * FROM evento',(error,eventos,next)=>{
            if(error){
                res.status(500).send({
                    msg: "Recurso no encontrado"
                });
                next();
            }else{
                conexion.query('SELECT * FROM blog', (error,blogs,next)=>{
                    if(error){
                        res.status(500).send({
                            msg: "Recurso no encontrado"
                        }); 
                    }else{
                        conexion.query('SELECT * FROM user', (error, users, next)=>{
                            if(error){
                                res.status(500).send({
                                    msg: "Recurso no encontrado"
                                });  
                                
                            }else{
                                res.render('layouts/dashboar',{
                                    title: 'panel Administrador || Fundacion filipense4:13',
                                    eventos:eventos,
                                    blogs:blogs,
                                    users:users
                                });   
                            }
                        });
                    }
                });
            }
        });
       
    };

    /* Usuarios */
    users(req,res){
        const {id} = req.query;

        conexion.query('SELECT * FROM user',(error,results)=>{
            if(error){
                throw error;
                return res.send(error);
            }else{
            
                    if(error){
                        res.send(error);
                    }else{
                        res.render('layouts/users',{
                            title: 'Usuarios || Fundacion filipense',
                            users: results
                        });

                    }
                
            }
        });
    };
    async addUser(req,res){
        const {email,password,role} = req.body;
        const passwordHaash = await bcryptjs.hash(password, 8);
        const date = new Date();
        const formatDate = (date) =>{
            
            const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            return fecha;
        };

        conexion.query('INSERT INTO user SET ?',{email_user:email,password_user:passwordHaash,rol_user:role,fecha_user:formatDate(date)}, error =>{
            if(error){
                console.log(error);
                return res.redirect('/usuarios');
            }else{
                return res.redirect('/usuarios');
            }
        });
    };
    async editUser(req,res){
        const {id} = req.body;
        conexion.query('SELECT * FROM user WHERE id_user = ?',[id],(error,result)=>{
            if(error){
                res.send(error);
            }else{
                res.render('layouts/users',{
                    title: 'Usuarios || Fundacion filipense',
                    user:result
                });
            }
        });

    };
    deleteUser(req,res){
        const id = req.params.id;
        conexion.query('DELETE FROM user WHERE id_user = ?', [id],error => {
            if(error){
                console.log(error);
                return res.send(error);
            }else{
                return res.redirect('/usuarios');
            }
        });
    };

    /* Blogs */
    blogs(req,res){
        conexion.query('SELECT * FROM blog',(error,results)=>{
            if(error){
                throw error;
            }else{
                res.render('layouts/blogs',{
                    title: 'Blogs || Fundacion filipense',
                    Blogs:results
                });
            }
        });
    };
    addBlog(req,res){
        const {title,Description_blog} = req.body;
        const {filename} = req.file;
        const imagePath = `imagenesBlog/${filename}`;
        const urlSeo = slug(title,'_');
        // Get date of creation
        const date = new Date();

        const formatDate = (date) =>{
            
            const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            return fecha;
        };

        const text =convert(Description_blog, {
            wordwrap: 130
        });

        const extract = text.substring(0,255);
        // Get the text of html data
        //create a elemten div
        
        conexion.query('INSERT INTO blog SET ?',{title_blog:title,urlSeo_blog:urlSeo,content_blog:Description_blog,extract_blog:extract,image_blog:imagePath,create_blog:formatDate(date)}, error =>{
            if(error){
                throw error;
            }else{
                return res.redirect('/blogs_admin');
            }
        });
    }
    // Delete Blog
    deleteBlog(req,res){
        const id = req.params.id;
        conexion.query('DELETE FROM blog WHERE id_blog = ?', [id], error => {
            if(error){
                res.status(400).redirect('/blogs_admin',({
                    error: error
                }));
            }else{
                res.status(200).redirect('/blogs_admin');
            }
        })
    }

    // Eventos
    events(req,res){
        conexion.query('SELECT * FROM evento',(error,results,next)=>{
            if(error){
                res.status(404).send({error:error});
                next();
            }else{
                res.status(200).render("layouts/eventos",({
                    title: 'Eventos || Fundacion filipense',
                    events: results
                }));
            }
        })
    }

    async addEvent(req,res){
        const {title,Description_event,fechaEvento} = req.body;
        const {filename} = req.file;
        const urlSeo = slug(title,'_');
        // const {filename} = req.file;
        console.log(filename)
        const imagePath = `imagenesEvents/${filename}`;
        const text = convert(Description_event,{
            wordwrap: 130
        });
        const date = new Date();

        const formatDate = (date) =>{
            
            const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            return fecha;
        };

        const extract = text.substring(0,255);
        conexion.query('INSERT INTO evento SET ?',{title_evento:title,urlSeo_evento:urlSeo,content_evento:Description_event,extract_evento:extract,date_evento:fechaEvento,create_evento:formatDate(date),image_evento:imagePath},error => {
            if(error){
                throw error;
            }else{
                res.status(200).redirect('/events_admin');
            }
        })
    }
    deleteEvent(req,res){
        const id = req.params.id;
        conexion.query('DELETE FROM evento WHERE id_evento  = ?',[id],(error,suucess,next)=>{
            if(error){
                res.status(404).send({error:error});
            }else{
                res.status(200).redirect('/events_admin');
            };
        });
    };

    /* Team */
    team(req,res){
        conexion.query('SELECT * FROM equipo',(error,team,next)=>{
            if(error){
                res.status(500).send({
                    msg: error,
                });
                next();
            }else{
                res.render('layouts/team',{
                    title: 'Equipo || Fundacion filipense',
                    miembros: team
                });
            };
        });
    };

    addTeam(req,res){
        const {name,status,Description_equipo,funciones,imageTeam} = req.body;
        const {filename} = req.file;
        const imagePath = `public/imagenesBlog/${filename}`;

        const date = new Date();

        const formatDate = (date) =>{
            
            const fecha = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
            return fecha;
        };

        const text = convert(Description_equipo, {
            wordwrap: 130
        });

        const extract = text.substring(0,255);

        conexion.query('INSERT INTO equipo SET ?',{nombre_equipo:name,descripcion_equipo:Description_equipo,extract_equipo:extract,funcion_equipo:funciones,status_equipo:status,image_equipo: imagePath,create_at_team:formatDate(date)},(error,next)=>{
            if(error){
                res.send(error);
                next()
            }else{
                res.status(200).redirect('/collaborators');
            }
        })
    };
    deleteTeam(req,res){
        const id = req.params.id;
        conexion.query('DELETE FROM equipo WHERE id_equipo  = ?',[id], error => {
            if(error){
               throw error;
            }else{
                res.status(200).redirect('/collaborators');
            }
        });
    }

    logout(req, res) {
        req.session.destroy(() => {
            res.redirect('/');
        });

    }
}


module.exports = new Admin();