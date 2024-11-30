package com.autoescuela.app.repository;

import com.autoescuela.app.libros.Libro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibrosRepository extends JpaRepository<Libro, Long> {}
