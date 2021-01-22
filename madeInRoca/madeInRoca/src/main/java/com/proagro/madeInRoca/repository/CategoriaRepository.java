package com.proagro.madeInRoca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proagro.madeInRoca.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
	public List<Categoria> findAllByNomeContainingIgnoreCase(String nome);
}
