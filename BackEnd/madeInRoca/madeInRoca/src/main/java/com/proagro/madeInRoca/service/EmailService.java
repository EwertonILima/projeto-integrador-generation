package com.proagro.madeInRoca.service;

import javax.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import com.proagro.madeInRoca.model.Usuario;


public interface EmailService {
	
	
	void sendEmail(SimpleMailMessage msg);
	
	void sendHtmlEmail(MimeMessage msg);
	
	void sendResetHtmlEmail(Usuario usuario, String newPass);
	
	void sendNewPasswordEmail(Usuario usuario, String newPass);
}
