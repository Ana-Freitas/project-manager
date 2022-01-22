package br.ifsp.edu.dw.projectmanager.resource;

import java.util.List;

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

import br.ifsp.edu.dw.projectmanager.domain.model.Alocation;
import br.ifsp.edu.dw.projectmanager.domain.model.Project;
import br.ifsp.edu.dw.projectmanager.repository.AlocationRepository;
import br.ifsp.edu.dw.projectmanager.service.AlocationService;

@RestController
@RequestMapping("/alocation")
public class AlocationResource {
	@Autowired
	private AlocationRepository alocationRepository;
	
	@Autowired
	private AlocationService alocationService;

	@PostMapping()
	@ResponseStatus(HttpStatus.OK)
	@PreAuthorize("hasAuthority('ROLE_SAVE_ALOCATION') and #oauth2.hasScope('write')")
	public Alocation alocateEmployeeInProject(@RequestBody Alocation alocation) {
		return alocationService.alocate(alocation);
	}
	
	@GetMapping()
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ALOCATION') and #oauth2.hasScope('read')")
	public List<Alocation> alocations() {
		List<Alocation> alocations = alocationRepository.findAll();
		return alocations;
	}
	
	@GetMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_ALOCATION') and #oauth2.hasScope('read')")
	public Alocation getAlocation(@PathVariable Long code) {
		Alocation alocation = alocationService.get(code);
		return alocation;
	}
	
	@PutMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SAVE_ALOCATION') and #oauth2.hasScope('write')")
	public ResponseEntity<Alocation> updateAlocation(@PathVariable Long code, @RequestBody Alocation alocation) {
		Alocation saved = alocationService.update(code, alocation);
		return ResponseEntity.ok(saved);
	}
	
	@DeleteMapping("/{code}")
	@ResponseStatus(HttpStatus.CREATED)
	public boolean deallocateProject(@PathVariable Long code) {
		alocationRepository.deleteById(code);
		return true;
	}
	
}
