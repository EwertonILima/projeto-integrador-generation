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
public class CategoriaControllerTest {

	@Autowired
	private MockMvc mvc;
	
	
	@Test
	public void returnBadRequest400FaltandoInformacoes() throws Exception {
		URI uri = new URI("/categoria");
		String json = "{\"id\":1, \"nome\":fruta}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(400));

	}
	
	@Test
	public void return201CadastrarCategoria() throws Exception {
		URI uri = new URI("/categoria");
		String json = "{\"nome\": \"fruta\",\"descricao\": \"fruta teste\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(201));
	}
	
	@Test
	public void returnOk200getCategorias() throws Exception {
		URI uri = new URI("/categoria");
		
		mvc.perform(MockMvcRequestBuilders.
				get(uri).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return201CategoriaAtualizada() throws Exception {
		URI uri = new URI("/categoria");
		String json = "{\"id\": 1, \"nome\": \"legumes\",\"descricao\":\"legume teste\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				put(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return201GetCategoriaByNome() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/categoria/nome/{nome}", "legumes").
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return200CategoriaById() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/categoria/{id}", 2L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return200DeleteCategoria() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				delete("/categoria/{id}", 1L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}

}
