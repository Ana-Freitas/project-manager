package br.ifsp.edu.dw.projectmanager.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Project;
import br.ifsp.edu.dw.projectmanager.domain.model.ProjectEmployee;
import br.ifsp.edu.dw.projectmanager.repository.ProjectRepository;

@Service
public class ProjectService {
	@Autowired
	private ProjectRepository projectRepository;
	
	public Project update(Long code, Project project) {
		Project saved = get(code);
		BeanUtils.copyProperties(project, saved, "code");
		return projectRepository.save(saved);
	}

	public Project get(Long code) {
		return projectRepository.findById(code).orElseThrow();
	}
}
