import express from 'express';
import usersRouter from './routes/usersRouter.mjs';
import productsRouter from './routes/productsRouter.mjs';

const port = process.env.port|| 5000;

const app = express();
app.use(express.json());
app.use(usersRouter);
app.use(productsRouter);

app.listen((port), () =>{
    console.log(`Server is running on port ${port}`);
    return "Server is running on port 5000";
});

const loginMiddleware = (req, res, next) => {
    console.log("Login middleware");
    next();
}
app.get('/',loginMiddleware, (req, res) => {
    res.send({
        message: "Welcome to the  home page"
    });
})

