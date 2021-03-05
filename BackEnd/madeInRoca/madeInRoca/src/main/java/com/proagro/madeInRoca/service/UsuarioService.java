package com.proagro.madeInRoca.service;

import java.nio.charset.Charset;
import java.util.Optional;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.proagro.madeInRoca.model.UserLogin;
import com.proagro.madeInRoca.model.Usuario;
import com.proagro.madeInRoca.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	private UsuarioRepository repository;

	public Optional<Usuario> CadastrarUsuario(Usuario usuario){

		if(usuario.getId() == 0) {
			if(repository.findByUsuario(usuario.getUsuario()).isPresent())
				return null;
		}
		

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String senhaEconder = encoder.encode(usuario.getSenha());

		usuario.setSenha(senhaEconder);

		return Optional.of(repository.save(usuario));
	}
	
	

	public Optional<UserLogin> Logar(Optional <UserLogin> user){

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		Optional <Usuario> usuario = repository.findByUsuario(user.get().getUsuario());

		if(usuario.isPresent()) {
			if(encoder.matches(user.get().getSenha(), usuario.get().getSenha())) {

				String auth = user.get().getUsuario()+":"+user.get().getSenha();
				byte[]encodedAuth=Base64.encodeBase64(auth.getBytes(Charset.forName("US-ASCII")));
				String authHeader="Basic " + new String (encodedAuth);

				user.get().setToken(authHeader);
				user.get().setNome(usuario.get().getNome());
				user.get().setId(usuario.get().getId());
				user.get().setFoto(usuario.get().getFoto());
				user.get().setSenha(usuario.get().getSenha());
				user.get().setTipoUsuario(usuario.get().getTipoUsuario());

				return user;
			}
		}

		return null;
	}

}
