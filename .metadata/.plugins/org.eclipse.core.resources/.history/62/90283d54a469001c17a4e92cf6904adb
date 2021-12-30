package br.ifsp.edu.dw.projectmanager.resource;

import org.springframework.web.bind.annotation.RestController;

import br.ifsp.edu.dw.projectmanager.domain.model.Group;
import br.ifsp.edu.dw.projectmanager.repository.GroupRepository;
import br.ifsp.edu.dw.projectmanager.service.GroupService;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/group")
public class GroupResource {

	@Autowired
	private GroupRepository groupRepository;
	
	@Autowired
	private GroupService groupService;
	
	@GetMapping
	public List<Group> groups(){
		return groupRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Group create(@Valid @RequestBody Group group) {
		return groupRepository.save(group);
	}
	
	@GetMapping("/{code}")
	public ResponseEntity<Group> getById(@PathVariable Long code){
		Optional<Group> group = groupRepository.findById(code);
		if(group.isPresent()) {
			return ResponseEntity.ok(group.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{code}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remove(@PathVariable Long code) {
		groupRepository.deleteById(code);
	}
	
	@PutMapping("/{code}")
	public ResponseEntity<Group> update(@PathVariable Long code, @Valid @RequestBody Group group) {
		Group saved = groupService.update(code, group);
		return ResponseEntity.ok(saved);
	}
}
