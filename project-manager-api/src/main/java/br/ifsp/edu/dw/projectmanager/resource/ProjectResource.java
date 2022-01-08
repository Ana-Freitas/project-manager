package br.ifsp.edu.dw.projectmanager.resource;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ifsp.edu.dw.projectmanager.domain.model.Project;
import br.ifsp.edu.dw.projectmanager.repository.ProjectRepository;
import br.ifsp.edu.dw.projectmanager.service.ProjectService;

@RestController
@RequestMapping("/project")
public class ProjectResource {
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private ProjectService projectService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_PROJECT') and #oauth2.hasScope('read')")
	public List<Project> projects(){
		List<Project> projects = projectRepository.findAll();
		return projects;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_SAVE_PROJECT') and #oauth2.hasScope('write')")
	public Project create(@Valid @RequestBody Project project) {
		return projectRepository.save(project);
	}
	
	@GetMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_PROJECT') and #oauth2.hasScope('read')")
	public ResponseEntity<Project> getById(@PathVariable Long code){
		Optional<Project> project = projectRepository.findById(code);
		if(project.isPresent()) {
			return ResponseEntity.ok(project.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{code}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_PROJECT') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long code) {
		projectRepository.deleteById(code);
	}
	
	@PutMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SAVE_PROJECT') and #oauth2.hasScope('write')")
	public ResponseEntity<Project> update(@PathVariable Long code, @RequestBody Project project) {
		Project saved = projectService.update(code, project);
		return ResponseEntity.ok(saved);
	}
}
