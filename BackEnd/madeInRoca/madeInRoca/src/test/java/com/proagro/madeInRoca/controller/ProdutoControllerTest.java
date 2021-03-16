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
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class ProdutoControllerTest {

	@Autowired
	private MockMvc mvc;
	
	@Test
	public void returnBadRequest400FaltandoInformacoes() throws Exception {
		URI uri = new URI("/produto");
		String json = "{\"id\":1, \"nome\":manga}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(400));
	}
	
	@Test
	public void return201CadastrarProduto() throws Exception {
		URI uri = new URI("/produto");
		String json = "{\"nome\": \"manga\",\"preco\":\"12\",\"qtdeEstoque\":\"20\", \"foto\":\"foto_exemplo\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				post(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(201));
	}
	
	@Test
	public void returnOk200getProdutos() throws Exception {
		URI uri = new URI("/produto");
		
		mvc.perform(MockMvcRequestBuilders.
				get(uri).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return200ProdutoAtualizada() throws Exception {
		URI uri = new URI("/produto");
		String json = "{\"id\": 1, \"nome\": \"manga\",\"preco\":\"12\",\"qtdeEstoque\":\"20\", \"foto\":\"foto_exemplo\"}";
		
		mvc.perform(MockMvcRequestBuilders.
				put(uri).content(json).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return404ProdutoByIdNaoExistente() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/categoria/{id}", 10L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(404));
	}
	
	@Test
	public void return200GetProdutoByNome() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/produto/nome/{nome}", "manga").
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}
	
	@Test
	public void return200DeleteProdutoCestaById() throws Exception {
		
		mvc.perform(MockMvcRequestBuilders.
				get("/cesta/nome/{nome}", 1L).
				contentType(MediaType.APPLICATION_JSON))
		.andExpect(MockMvcResultMatchers.status().is(200));
	}

}
