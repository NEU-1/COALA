package com.coala.backend.member.db.repository;

import com.coala.backend.member.db.entity.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CertificationRepository extends JpaRepository<Certification, String> {

    Optional<Certification> findByEmail(String email);
}
