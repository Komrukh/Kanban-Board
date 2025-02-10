package com.example.kanbanboard.repositories;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    List<Project> findByUser(User user);
}
