package br.ifsp.edu.dw.projectmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.edu.dw.projectmanager.domain.model.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {
	
}
