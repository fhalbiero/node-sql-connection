import { Router } from "express";
import { 
    insertPerson, 
    updatePerson, 
    selectPersons, 
    selectPerson, 
    deletePerson 
} from '../Controler/Person.js';

const router = Router();

router.get('/', (req, res)=>{
    res.json({
        "statusCode": 200,
        "msg": "Api running"
    })
})

router.get('/persons', selectPersons);
router.get('/person', selectPerson);
router.post('/person', insertPerson);
router.put('/person', updatePerson);

export default router;