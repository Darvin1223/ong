const route = require('express').Router();
const path = require('path');
const multer = require('multer');
const {v4: uuidv4} = require('uuid');
const {adminController,AuthController} = require('../controllers');
const verify = require('../middleware/verify.middleware');

// Setting multer and uuid
const storageBlog = multer.diskStorage({
    destination: 'public/imagenesBlog',
    filename: (req,file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});
const storageEvents = multer.diskStorage({
    destination: 'public/imagenesEvents',
    filename: (req,file, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
});
const storageTeam = multer.diskStorage({
    destination: 'public/imagenesTeam',
    filename: (req,res, cb)=>{
        cb(null, uuidv4() + path.extname(file.originalname).toLocaleLowerCase());
    }
})

const uploadBlog = multer({
    storage: storageBlog,
    dest: 'public/imagenesBlog'
});

const uploadEvent = multer({
    storage: storageEvents,
    dest:'public/imagenesEvents'
});

const uploadTeam = multer({
    storage: storageTeam,
    dest: 'public/imagenesTeam'
});



/* GET */
route.get('/admin', verify,adminController.Home);
route.get('/usuarios', verify,adminController.users);
route.get('/blogs_admin',verify,adminController.blogs);
route.get('/events_admin', verify,adminController.events);
route.get('/collaborators', verify,adminController.team);
route.get('/log-out', AuthController.logout);

/* POST */
route.post('/addUser', verify,adminController.addUser);
route.post('/addBlog', verify,uploadBlog.single('imageBlog'),adminController.addBlog);
route.post('/addEvent', verify,uploadEvent.single('imageEvent'),adminController.addEvent);
route.post('/addCollaborator', verify,uploadTeam.single('imageTeam'), adminController.addTeam);
/* PUT */
// route.put('/editeUser/:id',adminController.editUser);
/* DELETE */
route.get('/deleteUser/:id', verify,adminController.deleteUser);
route.get('/deleteBlog/:id', verify,adminController.deleteBlog);
route.get('/deleteEvent/:id', verify,adminController.deleteEvent);
route.get('/deleteCollaborador/:id', verify,adminController.deleteTeam);
module.exports = route;