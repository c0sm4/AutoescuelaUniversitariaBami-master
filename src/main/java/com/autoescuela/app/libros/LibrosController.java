package com.autoescuela.app.libros;

import com.autoescuela.app.security.AuthoritiesConstants;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/libros")
public class LibrosController {

  @Autowired private LibrosService libroService;

  @GetMapping
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public List<Libro> getAllLibros() {
    return libroService.findAll();
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public ResponseEntity<Libro> getLibroById(@PathVariable Long id) {
    Optional<Libro> libro = libroService.findById(id);
    if (libro.isPresent()) {
      return ResponseEntity.ok(libro.get());
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @PostMapping
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public Libro createLibro(@RequestBody Libro libro) {
    return libroService.save(libro);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public ResponseEntity<Void> deleteLibro(@PathVariable Long id) {
    libroService.deleteById(id);
    return ResponseEntity.noContent().build();
  }
}
