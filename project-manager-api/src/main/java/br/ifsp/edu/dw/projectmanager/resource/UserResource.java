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

import br.ifsp.edu.dw.projectmanager.domain.model.Permission;
import br.ifsp.edu.dw.projectmanager.domain.model.User;
import br.ifsp.edu.dw.projectmanager.repository.UserRepository;
import br.ifsp.edu.dw.projectmanager.service.UserService;

@RestController
@RequestMapping("/user")
public class UserResource {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	@PreAuthorize("hasAuthority('ROLE_SEARCH_USERS') and #oauth2.hasScope('read')")
	public List<User> users(){
		return userRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	@PreAuthorize("hasAuthority('ROLE_SAVE_USERS') and #oauth2.hasScope('write')")
	public User create(@Valid @RequestBody User user) {
		return userRepository.save(user);
	}
	
	@GetMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SEARCH_USERS') and #oauth2.hasScope('read')")
	public ResponseEntity<User> getById(@PathVariable Long code){
		Optional<User> user = userRepository.findById(code);
		if(user.isPresent()) {
			return ResponseEntity.ok(user.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{code}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	@PreAuthorize("hasAuthority('ROLE_REMOVE_USERS') and #oauth2.hasScope('write')")
	public void remove(@PathVariable Long code) {
		userRepository.deleteById(code);
	}
	
	@PutMapping("/{code}")
	@PreAuthorize("hasAuthority('ROLE_SAVE_USERS') and #oauth2.hasScope('write')")
	public ResponseEntity<User> update(@PathVariable Long code, @RequestBody User user) {
		User saved = userService.update(code, user);
		return ResponseEntity.ok(saved);
	}
	
	@PutMapping("/{user}/add-permission")
	@PreAuthorize("hasAuthority('ROLE_ADD_PERMISSION') and #oauth2.hasScope('write')")
	public ResponseEntity<User> addPermission(@PathVariable Long user, @RequestBody Permission permission) {
		User updated = userService.addPermission(user, permission);
		return ResponseEntity.ok(updated);
	}
	
	@PutMapping("/{user}/remove-permission")
	@PreAuthorize("hasAuthority('ROLE_REMOVE_PERMISSION') and #oauth2.hasScope('write')")
	public ResponseEntity<User> removePermission(@PathVariable Long user, @RequestBody Permission permission) {
		User updated = userService.removePermission(user, permission);
		return ResponseEntity.ok(updated);
	}
}
