package com.autoescuela.app.libros;

import com.autoescuela.app.repository.LibrosRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LibrosService {

  @Autowired private LibrosRepository librosRepository;

  public List<Libro> findAll() {
    List<Libro> librosList = new ArrayList<>();
    librosRepository.findAll().forEach(librosList::add);
    return librosList;
  }

  public Optional<Libro> findById(Long id) {
    return librosRepository.findById(id);
  }

  public Libro save(Libro libro) {
    return librosRepository.save(libro);
  }

  public void deleteById(Long id) {
    librosRepository.deleteById(id);
  }
}
