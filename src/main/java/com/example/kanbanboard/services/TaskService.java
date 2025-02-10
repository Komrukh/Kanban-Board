package com.example.kanbanboard.services;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.models.Task;
import com.example.kanbanboard.repositories.ProjectRepository;
import com.example.kanbanboard.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private ProjectRepository projectRepository;

    public List<Task> getTasksByProject(Long projectId) {
        Project project = projectRepository.findById(projectId).orElse(null);
        return taskRepository.findByProject(project);
    }

}
