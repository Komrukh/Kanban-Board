package com.example.kanbanboard.repositories;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.models.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProject(Project project);

    List<Task> findByProjectId(Long projectId);
}
