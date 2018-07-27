
/*
 * GET users listing.
 */

exports.list = function(req, res){

  req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM talleres',function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('talleres',{page_title:"Talleres - Node.js",data:rows});


         });

         //console.log(query.sql);
    });

};

exports.add = function(req, res){
  res.render('add_taller',{page_title:"Add Talleres - Node.js"});
};

exports.edit = function(req, res){

    var id = req.params.id;

    req.getConnection(function(err,connection){

        var query = connection.query('SELECT * FROM talleres WHERE id = ?',[id],function(err,rows)
        {

            if(err)
                console.log("Error Selecting : %s ",err );

            res.render('edit_taller',{page_title:"Edit Talleres - Node.js",data:rows});


         });

         //console.log(query.sql);
    });
};


exports.save = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));

    req.getConnection(function (err, connection) {

        var data = {

            altitud: input.altitud,
            longitud: input.longitud,
            nombre : input.nombre,


        };

        var query = connection.query("INSERT INTO talleres set ? ",data, function(err, rows)
        {

          if (err)
              console.log("Error inserting : %s ",err );

          res.redirect('/talleres');

        });

       // console.log(query.sql); get raw query

    });
};

exports.save_edit = function(req,res){

    var input = JSON.parse(JSON.stringify(req.body));
    var id = req.params.id;

    req.getConnection(function (err, connection) {

        var data = {

            latitud : input.latitud,
            longitud : input.longitud,
            nombre : input.nombre,


        };

        connection.query("UPDATE talleres set ? WHERE id = ? ",[data,id], function(err, rows)
        {

          if (err)
              console.log("Error Updating : %s ",err );

          res.redirect('/talleres');

        });

    });
};


exports.delete_talleres = function(req,res){

     var id = req.params.id;

     req.getConnection(function (err, connection) {

        connection.query("DELETE FROM talleres  WHERE id = ? ",[id], function(err, rows)
        {

             if(err)
                 console.log("Error deleting : %s ",err );

             res.redirect('/talleres');

        });

     });
};
