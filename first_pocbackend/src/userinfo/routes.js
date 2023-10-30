const { Router }=require('express');
const controller=require('./controller');

const router=Router();
router.get('/',controller.getUser);
router.post('/add/:email/:firstname/:lastname/:mobile/:dob/:address',controller.add);
router.delete('/delete/:email',controller.del);
router.put('/update',controller.update);
router.get('/getbyid/:email',controller.getbyid);
module.exports=router;