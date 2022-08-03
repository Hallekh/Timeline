const express = require('express');
const mongoose = require('mongoose')
const Article = require ('./models/article')
const articleRouter = require('./routs/articles');
const methodOverride = require('method-override');
const app = express();

mongoose.connect('mongodb+srv://halyna:gallina666@cluster0.aroox.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('DB is connected')
    })
    .catch(err => {
        console.log(err)
    });
    
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false}));
app.use(methodOverride('_method'))


app.get ('/', async (req, res) => {
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render('articles/index', {articles: articles})
})
app.use('/articles', articleRouter);

app.listen(5000, () => console.log("listening to port 5000"))