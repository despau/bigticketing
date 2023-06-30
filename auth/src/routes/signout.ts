import express from 'express';

const router = express.Router();

router.post('/api/users/signout', (req, res)=>{
    req.session = null;

    console.log('user is signed out')
    res.send({});
});

export { router as signoutRouter };