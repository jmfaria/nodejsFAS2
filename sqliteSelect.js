var sys    = require('sys'),
 sqlite = require('sqlite3');

var db = new sqlite.Database('E:\\nodejs\\historico.s3db');
db.serialize(function() {
	db.each("SELECT count(*) as num FROM chat", function(err, row) {
      console.log("Quantidade de mensagens no banco: " + row.num );
	  });
  db.each("SELECT id, nickname, mensagem FROM chat", function(err, row) {
      console.log("<"+row.id +"> " + row.nickname + ": " + row.mensagem);
	  });
});
db.close();
	
	