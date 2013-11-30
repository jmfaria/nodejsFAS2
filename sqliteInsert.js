var sqlite = require('sqlite3');

//Recebe o nick(email), e a mensagem que foi enviada
function insert(nick, msg){

	//Caminho da base de dados, com a estrutura que contém o chat
	var db = new sqlite.Database('E:\\nodejs\\historico.s3db');
	db.serialize(function() {		
		var stmt = db.prepare("INSERT INTO chat(nickname, mensagem) VALUES (?,?)");
		stmt.run(nick, msg);
		stmt.finalize();
	});
	db.close();
}
module.exports.insert = insert;