package com.trialvault.controller;

import com.trialvault.model.Trial;
import com.trialvault.repository.TrialRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trials")
@CrossOrigin(origins = "http://localhost:5173")
public class TrialController {

    private final TrialRepository repository;

    public TrialController(TrialRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<Trial> getAllTrials() {
        return repository.findAll();
    }

    @PostMapping
    public Trial createTrial(@RequestBody Trial trial) {
        return repository.save(trial);
    }
}
