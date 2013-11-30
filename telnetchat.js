var net = require('net'); // Carrega o m�dulo TCP.
var carrier = require('carrier'); // Carrega o m�dulo Carrier.
var connections = []; // Cria um array de conex�es.  

sqliteS = require('./sqliteSelect.js');
email = require('./mail3.js');

// Inicia o servidor.  
var server = net.createServer(function(conn){ 

 //address = net.address();
 //Exibe dados do cliente, como endere�o e porta utilizada
 console.log("Stream on %j", conn.address());
 //console.log("opened server on %j", address);
 
 
  // Adiciona no array uma conex�o de um usu�rio.
  connections.push(conn);  
  
  
  /*
	O Nodejs trabalha com eventos do lado do servidor, que s�o diferente de eventos do lado cliente(mouse clicked, mouse over, keypress)
	Um evento do lado do servidor por ser altera��o no status de uma conex�o, ou recebimento de dados por exemplo.
  */
  // Evento que remove o usu�rio do array quando ele � desconectado.
  conn.on('close', function(){ 
  
	//Captura a posi��o do array em que a conex�o fechada est�
    var pos = connections.indexOf(conn);		
	
	//Se houver mais de uma conex�o
    if(connections.length > 0){	
		//Ent�o essa conex�o ser� fechada, removendo "1" conex�o do array	
		connections.splice(pos, 1);
	  
	  //Se ap�s fechar a conex�o, n�o houverem mais conex�es
	  if(connections.length == 0){				
		//Faz o select no banco buscando as mensagens
		sqliteS.select();				
		
		//Envia o email com retardo de 3 segundos
		setTimeout(function(){
		email.enviar(sqliteS.msg, sqliteS.emails);},
		3000);
	  }	  
    }
  });

  //Imprime no cliente a mensagem de in�cio no mini-chat.  
  conn.write('Node ChatName(email): ');
  // Vari�vel para identificar o nome do usu�rio conectado.  
  var username;

  // No evento carry � que o mini-chat acontece.  
  // A vari�vel line � respons�vel por carregar as mensagens do chat.  
  carrier.carry(conn, function(line){
    // Se a vari�vel username estiver nula, � definido o um nome para ela.  
    if(!username){
      username = line;
      conn.write("Ola! "+ username +"\r\n");
      return;
    }
    // Aqui comparo o valor de line com as palavras-chaves "end","quit" e "exit" que ir�o finalizar uma conex�o.  
    if(line == 'end' || line == 'quit' || line == 'exit'){
      conn.end();
      return;
    }

    // Se nenhuma das condi��es acontecer, ent�o preparamos uma  mensagem de feedback.  
    var feedback = "<<" + username +">>: "+ line +"\r\n";
	sqliteI = require('./sqliteInsert.js');
	sqliteI.insert(username, line);
	

    //Aqui ocorre o loop de distribui��o de mensageria.  
    connections.forEach(function(one_connection){
      one_connection.write(feedback);		
    });
  });
});
// Inicia o servidor na porta 4000.  
server.listen(4000); 
// Mensagem de servidor ligado.
console.log("Servidor mini-chat em execucao.");