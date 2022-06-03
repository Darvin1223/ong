const route = require('express').Router();
const {indexControllers,AuthController} = require('../controllers');


route.get('/',indexControllers.index);
route.get('/blogs', indexControllers.blogs);
route.get('/events', indexControllers.eventos);
// route.get('/events/:url_seo', indexControllers.evento);
route.get('/event', indexControllers.evento);
// route.get('/blog/:seo/:id', indexControllers.blog);
route.get('/blog', indexControllers.blog);
route.get('/login', indexControllers.login);

route.post('/sing-in', AuthController.login);
module.exports = route;