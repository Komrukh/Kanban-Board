package com.example.kanbanboard.services;

import com.example.kanbanboard.models.Project;
import com.example.kanbanboard.models.User;
import com.example.kanbanboard.repositories.ProjectRepository;
import com.example.kanbanboard.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Project> getProjectsByUser(String username) {
        User user = userRepository.findByUsername(username);
        return projectRepository.findByUser(user);
    }

}
