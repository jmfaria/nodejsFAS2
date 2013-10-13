var nodemailer = require("nodemailer");

exports.enviar = function(msg, emails){

	var mailOptions = {
	   from: "nodejs.fas2@gmail.com", // Remetente
	   to: emails.toString(),	   
	   subject: "Chat NodeJS - FAS2", // Assunto
	   text: msg // Mensagem
	}
	
	var smtpTransport = nodemailer.createTransport("SMTP",{
	   service: "Gmail",
	   auth: {
		   user: "nodejs.fas2@gmail.com",
		   pass: "w3.x9#l7"
	   }
	});	
		
	smtpTransport.sendMail(mailOptions, function(error, response){
	
		console.log(emails.toString());
		
	   if(error){
		   console.log(error);
	   }else{
		   console.log("Mensagem enviada: " + response.message);
	   }
	});		
}

