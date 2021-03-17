package com.proagro.madeInRoca.controller;


import java.net.URI;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;


@RunWith(SpringRunner.class)
//@WebMvcTest
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UsuarioControllerTest {

	@Autowired
	private MockMvc mvc;
	
	
	@Test
	public void returnBadRequest400FaltandoInformacoes() throws Exception {
		URI uri = new URI("/usuarios/cadastrar");
		String json = "{\"id\":1, \"usuario\":invalido@email.com, \"senha\":12345678, \"nome\":igor}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(400));

	}
	
	@Test
	public void return201UsuarioCadastrado() throws Exception {
		URI uri = new URI("/usuarios/cadastrar");
		String json = "{\"usuario\": \"invalido@email.com\",\"senha\":\"12345678\",\"nome\":\"igor\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(201));
	}
	
	@Test
	public void returnOk200getUsuarios() throws Exception {
		URI uri = new URI("/usuarios");
		
		mvc.perform(MockMvcRequestBuilders.
				get(uri).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void returnOk200LogarUsuario() throws Exception {
		URI uri = new URI("/usuarios/logar");
		String json = "{\"usuario\": \"invalido@email.com\",\"senha\":\"12345678\"}";

		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return201UsuarioAtualizado() throws Exception {
		URI uri = new URI("/usuarios/atualizar");
		String json = "{\"id\": 1, \"usuario\": \"mateus@email.com\",\"senha\":\"12345678\",\"nome\":\"mateus\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				put(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(201));
	}
	
	@Test
	public void return200UsuarioById() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/usuarios/{id}", 1L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return201GetUsuarioByNome() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/usuarios/nome/{nome}", "igor").
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return200DeleteUsuario() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				delete("/usuarios/{id}", 1L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}

}
