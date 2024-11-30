package com.autoescuela.app.repository;

import com.autoescuela.app.domain.Authority;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/** Spring Data JPA repository for the Authority entity. */
@SuppressWarnings("unused")
@Repository
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
