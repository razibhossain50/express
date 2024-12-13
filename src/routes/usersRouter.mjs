import {Router} from 'express';
import {checkSchema, query, validationResult} from "express-validator";
import users from "../data/users.json" assert {type: 'json'};
import {userSchema} from "../utils/userSchema.mjs";

const router = Router();

router.get('/api/users', query('filter').isString().notEmpty().isLength({min:3,max:5}).withMessage('name must be 3 and max 5'),(req, res) => {
    const result = validationResult(req);
    console.log(result);
    const { filter, value } = req.query;
    if(filter && value) {
        const filteredUsers = users.filter(user => user[filter].includes(value));
        return res.send(filteredUsers);
    }else {
        res.send(users);
    }});
router.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    if(isNaN(id)) return res.send({
        response: "Invalid id"
    });
    const user = users.find(user => user.id === Number(id));
    if(!user) return res.send({
        response: "User not found"
    });
    res.send(user);
})

router.post('/api/users', checkSchema(userSchema),(req, res) => {
    const result = validationResult(req);
    console.log(result);
    if(!result.isEmpty()) return res.status(400).send({error: result.array()})
    const{id, name, email, age, isActive} = req.body;
    const newUser = {
        id: users.length + 1,
        name,
        email,
        age,
        isActive
    };
    users.push(newUser);
    res.send(users);
})

router.put('/api/users/:id',(req, res)=>{
    const {id} = req.params;
    const findIndex = users.findIndex(user => user.id === Number(id));
    if(findIndex ===-1) return res.send("User not found");
    users[findIndex] ={
        id: Number(id),...req.body
    }
    res.send(users);
});

router.patch('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const findIndex = users.findIndex(user => user.id === Number(id));
    if (findIndex === -1) {
        return res.status(404).send({ error: "User not found" });
    }
    users[findIndex] = {...users[findIndex], ...req.body};
    res.send(users);
});

router.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const findIndex = users.findIndex(user => user.id === Number(id));
    if (findIndex === -1) {
        return res.status(404).send({ error: "User not found" });
    }
    users.splice(findIndex, 1);
    res.send(users);
})

export default router;
