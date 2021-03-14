package com.proagro.madeInRoca.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.proagro.madeInRoca.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	public List<Usuario> findAllByNomeContainingIgnoreCase(String nome);

	public Optional<Usuario> findByUsuario(String userName);

	@Transactional(readOnly=true)
	Usuario findByEmail(String email);
}
