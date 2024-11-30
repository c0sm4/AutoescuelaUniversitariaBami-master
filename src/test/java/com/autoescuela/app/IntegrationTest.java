package com.autoescuela.app;

import com.autoescuela.app.config.AsyncSyncConfiguration;
import com.autoescuela.app.config.EmbeddedSQL;
import com.autoescuela.app.config.JacksonConfiguration;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import org.springframework.boot.test.context.SpringBootTest;

/** Base composite annotation for integration tests. */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@SpringBootTest(
    classes = {
      AutoescuelaUniversitariaApp.class,
      JacksonConfiguration.class,
      AsyncSyncConfiguration.class
    })
@EmbeddedSQL
public @interface IntegrationTest {}
