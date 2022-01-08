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

import br.ifsp.edu.dw.projectmanager.domain.model.Employee;
import br.ifsp.edu.dw.projectmanager.repository.EmployeeRepository;
import br.ifsp.edu.dw.projectmanager.service.EmployeeService;


@RestController
@RequestMapping("/employee")
public class EmployeeResource {
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private EmployeeService employeeService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_EMPLOYEE') and #oauth2.hasScope('read')")
	public List<Employee> employees(){
		return employeeRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_SAVE_EMPLOYEE') and #oauth2.hasScope('write')")
	public Employee create(@Valid @RequestBody Employee employee) {
		return employeeRepository.save(employee);
	}
	
	@GetMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_EMPLOYEE') and #oauth2.hasScope('read')")
	public ResponseEntity<Employee> getById(@PathVariable Long code){
		Optional<Employee> employee = employeeRepository.findById(code);
		if(employee.isPresent()) {
			return ResponseEntity.ok(employee.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_REMOVE_EMPLOYEE') and #oauth2.hasScope('write')")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remove(@PathVariable Long code) {
		employeeRepository.deleteById(code);
	}
	
	@PutMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SAVE_EMPLOYEE') and #oauth2.hasScope('write')")
	public ResponseEntity<Employee> update(@PathVariable Long code, @RequestBody Employee employee) {
		Employee saved = employeeService.update(code, employee);
		return ResponseEntity.ok(saved);
	}
}
