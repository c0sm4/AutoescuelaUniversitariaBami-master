package com.autoescuela.app.webScraping;

import com.microsoft.playwright.*;
import com.microsoft.playwright.options.AriaRole;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ScrapingService {

    private final Logger log = LoggerFactory.getLogger(ScrapingService.class);

    public String scrapeData(
        String dni,
        String fechaNacimiento,
        String fechaExamen
    ) {
        try (Playwright playwright = Playwright.create()) {
            Browser browser = playwright
                .chromium()
                .launch(new BrowserType.LaunchOptions().setHeadless(true));
            Page page = browser.newPage();

            // 1. Navegar a la página
            log.info("Accediendo a la página...");
            page.navigate(
                "https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces"
            );

            // 2. Rellenar el formulario
            log.info("Rellenando el formulario...");
            page.fill("input[id='formularioBusquedaNotas:nifnie']", dni);
            page.fill(
                "input[id='formularioBusquedaNotas:fechaNacimiento']",
                fechaNacimiento
            );
            page.fill(
                "input[id='formularioBusquedaNotas:fechaExamen']",
                fechaExamen
            );

            // 3. Seleccionar el permiso
            log.info("Seleccionando el permiso...");
            page.selectOption(
                "select[id='formularioBusquedaNotas:clasepermiso']",
                "B"
            );

            // 4. Enviar el formulario haciendo clic en el botón "Buscar"
            log.info("Enviando el formulario...");
            page
                .getByRole(
                    AriaRole.BUTTON,
                    new Page.GetByRoleOptions().setName("Buscar")
                )
                .click(); // Ajusta el nombre según el texto del botón

            // 5. Esperar el resultado
            log.info("Esperando resultados...");
            page.waitForSelector(
                "div[id^='formularioResultadoNotas:j_id38:0:j_id70']",
                new Page.WaitForSelectorOptions().setTimeout(60000)
            );

            // 6. Obtener el texto "APTO"
            String resultado = page.textContent(
                "div[id^='formularioResultadoNotas:j_id38:0:j_id70']"
            );
            log.info("Scraping completado. Resultado: " + resultado);
            return resultado.trim(); // Elimina espacios en blanco adicionales
        } catch (Exception e) {
            log.error("Error durante el scraping", e);
            throw new RuntimeException("Scraping fallido", e);
        }
    }
}
