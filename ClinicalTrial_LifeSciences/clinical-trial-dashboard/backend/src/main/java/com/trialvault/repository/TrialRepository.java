package com.trialvault.repository;

import com.trialvault.model.Trial;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrialRepository extends JpaRepository<Trial, Long> {
}
