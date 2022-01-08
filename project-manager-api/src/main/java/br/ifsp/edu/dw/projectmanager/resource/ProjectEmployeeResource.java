package br.ifsp.edu.dw.projectmanager.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.ifsp.edu.dw.projectmanager.domain.model.ProjectEmployee;
import br.ifsp.edu.dw.projectmanager.repository.ProjectEmployeeRepository;
import br.ifsp.edu.dw.projectmanager.service.ProjectEmployeeService;

@RestController
public class ProjectEmployeeResource {
	/*@Autowired
	private ProjectEmployeeRepository projectEmployeeRepository;
	
	@Autowired
	private ProjectEmployeeService projectEmployeeService;

	@PostMapping("/project/{project}/employee")
	@ResponseStatus(HttpStatus.OK)
	public ProjectEmployee alocateEmployeeInProject(@PathVariable Long project, @RequestBody ProjectEmployee projemployee) {
		return employeeService.alocateInProject(projemployee);
	}*/
	/*
	@PostMapping("{code}/deallocate/project/{project}")
	@ResponseStatus(HttpStatus.CREATED)
	public ProjectEmployee deallocateProject(@PathVariable Long code, @PathVariable Long project) {
		return employeeService.deallocateProject(code, project)
	}
	*/
}
