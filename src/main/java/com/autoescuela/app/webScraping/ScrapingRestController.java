package com.autoescuela.app.webScraping;

import com.autoescuela.app.security.AuthoritiesConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/scraping")
public class ScrapingRestController {

  private final Logger log = LoggerFactory.getLogger(ScrapingRestController.class);

  private final ScrapingService scrapingService;

  public ScrapingRestController(ScrapingService scrapingService) {
    this.scrapingService = scrapingService;
  }

  @PostMapping("/nota")
  @PreAuthorize("hasAuthority(\"" + AuthoritiesConstants.ADMIN + "\")")
  public ResponseEntity<?> obtenerNota(
      @RequestParam String dni,
      @RequestParam String fechaNacimiento,
      @RequestParam String fechaExamen) {
    log.info(
        "Request received for scraping with DNI: {}, FechaNacimiento: {}, FechaExamen: {}",
        dni,
        fechaNacimiento,
        fechaExamen);

    try {
      String result = scrapingService.scrapeData(dni, fechaNacimiento, fechaExamen);
      return ResponseEntity.ok(result);
    } catch (Exception e) {
      log.error("Error during scraping process", e);
      return ResponseEntity.status(500).body("Error while retrieving data: " + e.getMessage());
    }
  }
}
