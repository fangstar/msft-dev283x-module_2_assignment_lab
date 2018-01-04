var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorhandler = require('errorhandler')

var routes = require('./routes')

var app = express();

let store = {
  posts: [
    {
      name: 'Top 10 ES6 Features every Web Developer must know',
      url: 'https://webapplog.com/es6',
      text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
      comments: [
        {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
        {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
        {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
      ]
    }
  ]
}

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(errorhandler())
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
  req.store = store
  next()
})

// Posts
app.get('/posts',routes.posts.getPosts);

app.post('/posts',routes.posts.addPost);

app.put('/posts/:postId',routes.posts.updatePost)

app.delete('/posts/:postId',routes.posts.removePost)

// Comments
app.get('/posts/:postId/comments',routes.comments.getComments);

app.post('/posts/:postId/comments',routes.comments.addComment);

app.put('/posts/:postId/comments/:commentId',routes.comments.updateComment)

app.delete('/posts/:postId/comments/:commentId',routes.comments.removeComment)


// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(3000)
