package com.example.kanbanboard.controllers;

import com.example.kanbanboard.models.Task;
import com.example.kanbanboard.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/projects/{projectId}")
    @PreAuthorize("hasRole('USER')")
    public List<Task> getProjectTasks(@PathVariable Long projectId) {
        return taskService.getTasksByProject(projectId);
    }
}
