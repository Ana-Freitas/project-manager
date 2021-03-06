package br.ifsp.edu.dw.projectmanager.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Employee;
import br.ifsp.edu.dw.projectmanager.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeRepository employeeRepository;
	
	public Employee update(Long code, Employee employee) {
		Employee saved = get(code);
		BeanUtils.copyProperties(employee, saved, "code");
		return employeeRepository.save(saved);
	}

	public Employee get(Long code) {
		return employeeRepository.findById(code).orElseThrow();
	}
}
