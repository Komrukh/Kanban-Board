package com.example.kanbanboard.controllers;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @GetMapping
    @PreAuthorize("hasRole('USER')")
    public List<Project> getUserProjects(@RequestParam String username) {
        return projectService.getProjectsByUser(username);
    }

}