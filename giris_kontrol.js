var http = require('http');
var url = require('url');
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "nodedb"
    }
);

http.createServer(function (req, res){

    fs.readFile("giris_form.html", function(err,data){

        if(err){
            res.writeHead(404, {'Content-Type':'text/html'});
            return res.end("404 Dosya bulunamadi.");
        }

        res.writeHead(200, {'Content-Type':'text/html'});
        res.write(data);
        return res.end();

    });

    var bilgi = url.parse(req.url, true).query;

    con.connect(function(err){
        if(err) throw err;
        console.log("Baglandi");

        var sql = "SELECT * FROM user";

        con.query(sql, function(err, result){
            console.log("GELEN------------");
            console.log(result);
            console.log("ELDEKI-----------");
            console.log(bilgi);
        });

    });
    


}).listen(8080);