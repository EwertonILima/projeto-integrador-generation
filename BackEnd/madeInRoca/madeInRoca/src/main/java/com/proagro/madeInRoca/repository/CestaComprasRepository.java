package com.proagro.madeInRoca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proagro.madeInRoca.model.CestaCompras;

public interface CestaComprasRepository extends JpaRepository<CestaCompras, Long> {

	public List<CestaCompras> findAllByNomeContainingIgnoreCase(String nome);
}
