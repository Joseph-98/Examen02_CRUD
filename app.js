var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');


var customers = require('./routes/talleres');
var app = express();

var connection  = require('express-myconnection');
var mysql = require('mysql');

// all environments
app.set('port', process.env.PORT || 4300);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/

app.use(

    connection(mysql,{

        host: 'localhost', //'localhost',
        user: 'root',
        password : 'jaig1998',
        port : 3306, //port mysql
        database:'prueba'

    },'pool') //or single

);



app.get('/', routes.index);
app.get('/talleres', talleres.list);
app.get('/talleres/add', talleres.add);
app.post('/talleres/add', talleres.save);
app.get('/talleres/delete/:id', talleres.delete_talleres);
app.get('/talleres/edit/:id', talleres.edit);
app.post('/talleres/edit/:id',talleres.save_edit);


app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
