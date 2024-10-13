import { User } from '@/model/User.js';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';


const users : User[] = [];

// load some dummy data from users.json
const usersJson = fs.readFileSync(
    path.resolve(import.meta.dirname, 'users.json'),
    'utf-8',
);
const usersData = JSON.parse(usersJson);

for (const user of usersData) {
    users.push(
        new User({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.image,
        }),
    );
}

async function sleep (ms : number)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

const app = express();
app.use(express.json());
app.use(cors());

app.get('/users', async(req, res) => {
    const page : number = req.query.page ? parseInt(req.query.page as any) : 0;
    const perPage : number = req.query.perPage ? parseInt(req.query.perPage as any) : 10;
    const filter : string = req.query.filter ? req.query.filter as any : null;
    
    let filteredUsers = users;
    if (filter) {
        const lcFilter = filter.toLowerCase();
        filteredUsers = filteredUsers.filter(e => {
            return e.fullName.toLowerCase().includes(lcFilter);
        });
    }
    
    const offset = page * perPage;
    const limit = offset + perPage;
    const sliced = filteredUsers.slice(offset, limit);
    
    const pages = Math.ceil(filteredUsers.length / 10);
    
    await sleep(500);
    res.status(200);
    res.json({
        page,
        perPage,
        pages,
        total: users.length,
        data: sliced,
    });
});

app.get('/users/:id', async(req, res) => {
    const id : number = parseInt(req.params.id);
    
    const user = users.find(e => e.id === id);
    
    await sleep(500);
    res.status(200);
    res.json(user);
});

app.post('/users', async(req, res) => {
    const user = new User(req.body);
    
    const lastId = users.length > 0
        ? users[users.length - 1].id
        : 0
    ;
    user.id = lastId + 1;
    
    users.push(user);
    
    await sleep(500);
    res.status(200);
    res.json(user);
});

app.put('/users/:id', async(req, res) => {
    const id : number = parseInt(req.params.id);
    
    const user = users.find(e => e.id === id);
    if (!user) {
        res.status(404);
        res.json({ message: 'User not found' });
        return;
    }
    
    const userData = new User(req.body);
    Object.assign(user, userData);
    
    await sleep(500);
    res.status(200);
    res.json(user);
});

app.delete('/users/:id', async(req, res) => {
    const id : number = parseInt(req.params.id);
    
    const idx = users.findIndex(e => e.id === id);
    if (idx === -1) {
        res.status(404);
        res.json({ message: 'User not found' });
        return;
    }
    
    users.splice(idx, 1);
    
    await sleep(500);
    res.status(200);
    res.json({ result: 'Ok' });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
