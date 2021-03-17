package com.proagro.madeInRoca.repository;

import java.math.BigDecimal;
import java.util.Optional;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.proagro.madeInRoca.model.Categoria;
import com.proagro.madeInRoca.model.CestaCompras;
import com.proagro.madeInRoca.model.Produto;
import com.proagro.madeInRoca.model.Usuario;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class RepositoryTest {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	private CategoriaRepository categoriaRepository;
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private CestaComprasRepository cestaRepository;
	
	
	
	@Autowired
	private TestEntityManager em;

//	teste de repository de usuario
	@Test
	public void devolveUsuarioByNome() {
		String nomeUsuario = "igorgato@gmail.com";
		
		Usuario user = new Usuario();
		user.setNome("igor");
		user.setUsuario(nomeUsuario);
		user.setSenha("senhateste");
		
		em.persist(user);
		
		Optional<Usuario> usuario = usuarioRepository.findByUsuario(nomeUsuario);
		Assert.assertNotNull(usuario);
		Assert.assertEquals(nomeUsuario, usuario.get().getUsuario());
	}
	
	@Test
	public void devolveUsuarioNaoExistenteByNome() {
		String nomeUsuario = "mateus@gmail.com";
		
		Optional<Usuario> usuario = usuarioRepository.findByUsuario(nomeUsuario);
		usuario.equals(null);
	}
	
//	teste de repository de produto
	@Test
	public void devolveProdutoById() {
		String nome = "manga";
		
		Produto produto = new Produto();
		produto.setNome(nome);
		produto.setFoto("foto_exemplo");
		produto.setPreco(new BigDecimal("2.99"));
		produto.setQtdeEstoque(20);
		
		
		em.persist(produto);
		
		Optional<Produto> prod = produtoRepository.findById((long) 1);
		Assert.assertNotNull(prod);
		Assert.assertEquals(nome, prod.get().getNome());
	}
	
	@Test
	public void devolveProdutoNaoExistenteByNome() {
		
		Optional<Produto> prod = produtoRepository.findById((long) 1);
		prod.equals(null);
	}
	
//	teste de repository de cesta de compras
	@Test
	public void devolveCestaById() {
		String nome = "manga";
		
		CestaCompras cesta = new CestaCompras();
		cesta.setNome(nome);
		cesta.setFoto("foto_exemplo");
		cesta.setPreco(new BigDecimal("2.99"));
		cesta.setQuantidade(20);
		cesta.setCategoria("fruta");
		
		
		
		em.persist(cesta);
		
		Optional<CestaCompras> cestaCompras = cestaRepository.findById((long) 1);
		Assert.assertNotNull(cestaCompras);
		Assert.assertEquals(nome, cestaCompras.get().getNome());
	}
	
	@Test
	public void devolveCestaComprasNaoExistenteByNome() {
		
		Optional<Produto> prod = produtoRepository.findById((long) 1);
		prod.equals(null);
	}
	
//	teste de repository de categoria
	@Test
	public void devolveCategoriaById() {
		String nome = "fruta";
		
		Categoria categoria = new Categoria();
		categoria.setNome(nome);
		categoria.setDescricao("descricao teste");
		
		
		em.persist(categoria);
		
		Optional<Categoria> cat = categoriaRepository.findById((long) 1);
		Assert.assertNotNull(cat);
		Assert.assertEquals(nome, cat.get().getNome());
	}
	
	@Test
	public void devolveCategoriaNaoExistenteByNome() {
		
		Optional<Categoria> cat = categoriaRepository.findById((long) 1);
		cat.equals(null);
	}
	

}











