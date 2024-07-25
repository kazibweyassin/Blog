const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize posts array
let posts = [];

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Home route to display all posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Create post
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    posts.push({ id: posts.length, title, content });
    res.redirect('/');
});

// Edit post form
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('edit', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Update post
app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        post.title = title;
        post.content = content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});

// Delete post
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
