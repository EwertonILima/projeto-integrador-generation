package com.proagro.madeInRoca.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.proagro.madeInRoca.model.CestaCompras;
import com.proagro.madeInRoca.repository.CestaComprasRepository;

@RestController
@RequestMapping("/cesta")
@CrossOrigin("*")
public class CestaComprasController {

	@Autowired
	private CestaComprasRepository repository;
	
	@GetMapping
	public ResponseEntity<List<CestaCompras>> GetAll()
	{
		return ResponseEntity.ok(repository.findAll());
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<CestaCompras> GetById(@PathVariable long id)
	{
		return repository.findById(id)
				.map(resp -> ResponseEntity.ok(resp))
				.orElse(ResponseEntity.notFound().build());
	}
	
	@GetMapping("/nome/{nome}")
	public ResponseEntity<List<CestaCompras>> GetByNome(@PathVariable String nome)
	{
		return ResponseEntity.ok(repository.findAllByNomeContainingIgnoreCase(nome));
	}
	
	@PostMapping
	public ResponseEntity<CestaCompras> post(@RequestBody CestaCompras cesta)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(cesta));
	}
	
	@PutMapping
	public ResponseEntity<CestaCompras> put(@RequestBody CestaCompras cesta)
	{
		return ResponseEntity.status(HttpStatus.OK).body(repository.save(cesta));
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable long id)
	{
		repository.deleteById(id);
	}
}
