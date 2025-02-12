package com.example.kanbanboard.controllers;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.models.Task;
import com.example.kanbanboard.repositories.TaskRepository;
import com.example.kanbanboard.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects/{projectId}")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/tasks")
    public ResponseEntity<Task> createTask(@PathVariable Long projectId, @RequestBody Task task) {
        Task createdTask = taskService.createTask(projectId, task);
        if (createdTask == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(createdTask);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getTasks(@PathVariable Long projectId) {
        List<Task> tasks = taskService.getTasksByProject(projectId);
        if (tasks == null) {
            return ResponseEntity.badRequest().body(null);
        }
        return ResponseEntity.ok(tasks);
    }
}
