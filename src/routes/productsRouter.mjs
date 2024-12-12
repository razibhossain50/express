import {Router} from "express";
import products from "../data/products.json" assert {type: "json"};

const router = Router();

router.get('/api/products', (req, res) => {
    res.send(products);
})

export default router;