const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded())

const User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    email: String,
    phone: Number
})

//Find: get/users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find()
        res.json({
            status: 'Success',
            data: users
        });
    }
    catch (error) {
        res.json(
            {
                status: 'failed',
                message: 'Something wents wrong'
            }
        )
    }
})

//Create: Post/users
app.post('/users', async (req, res) => {
    try {
        const {firstName, lastName, email, phone} = req.body;
        await User.create({firstName, lastName, email, phone});

        res.json({
            status: 'Success',
            message: 'user created successfully'
        });
    }
    catch (error) {
        res.json(
            {
                status: 'failed',
                message: 'Something wents wrong'
            }
        )
    }
})
//UPDATE: patch /users/:id
app.patch('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, email, phone} = req.body;
        await User.findByIdAndUpdate(id,{firstName, lastName, email, phone});

        res.json({
            status: 'Success',
            message: 'Data Updated successfully'
        });
    }
    catch (error) {
        res.json(
            {
                status: 'failed',
                message: 'Something wents wrong'
            }
        )
    }
})

//DELETE: delete /users/:id
app.delete('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        await User.findByIdAndDelete(id);

        res.json({
            status: 'Success',
            message: 'Data Deleted successfully'
        });
    }
    catch (error) {
        res.json(
            {
                status: 'failed',
                message: 'Something wents wrong'
            }
        )
    }
})
app.get('/', (req, res) => {
    res.send('we are going to learn how to connect MongoDB to Nodejs Server');
});

app.listen(process.env.PORT, () => {
    mongoose
        .connect(process.env.MONGODB_URL)
        .then(() => console.log(`Server is running :) `))
        .catch((error) => console.log(error));
});