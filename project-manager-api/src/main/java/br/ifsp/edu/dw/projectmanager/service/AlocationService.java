package br.ifsp.edu.dw.projectmanager.service;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Alocation;
import br.ifsp.edu.dw.projectmanager.repository.AlocationRepository;

@Service
public class AlocationService {
	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private AlocationRepository alocationRepository;


	public Alocation alocate(Alocation alocation) {
		boolean employeeExists = employeeService.get(alocation.getEmployee().getCode()) != null;
		boolean projectExists = projectService.get(alocation.getProject().getCode()) != null;
		
		if(employeeExists && projectExists) {
			return alocationRepository.save(alocation);
		}
		return null;
	}
	
	public Alocation update(Long code, Alocation alocation) {
		Alocation saved = get(code);
		BeanUtils.copyProperties(alocation, saved, "code");
		return alocationRepository.save(saved);
	}

	public 	Alocation get(Long code) {
		return alocationRepository.findById(code).orElseThrow();
	}
}
