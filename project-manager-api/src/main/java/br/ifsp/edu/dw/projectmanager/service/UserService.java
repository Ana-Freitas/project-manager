package br.ifsp.edu.dw.projectmanager.service;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Permission;
import br.ifsp.edu.dw.projectmanager.domain.model.User;
import br.ifsp.edu.dw.projectmanager.repository.PermissionRepository;
import br.ifsp.edu.dw.projectmanager.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PermissionRepository permissionRepository;
	
	public User update(Long code, User user) {
		User saved = get(code);
		BeanUtils.copyProperties(user, saved, "code");
		return userRepository.save(saved);
	}

	public User get(Long code) {
		return userRepository.findById(code).orElseThrow();
	}
	
	public Permission getPermission(Long code) {
		return permissionRepository.findById(code).orElseThrow();
	}
	
	public boolean notExistsPermission(User user, Long permission) {
		List<Permission> permissions = user.getPermissions();
		boolean exists = permissions.stream().filter(x -> x.getCode() == permission).toArray().length > 0;
		return !exists;
	}
	
	public User addPermission(Long user, Permission permission) {
		User userSaved = get(user);
		if(this.notExistsPermission(userSaved, permission.getCode())) {
			Permission permissionSaved = getPermission(permission.getCode());
			List<Permission> permissions = userSaved.getPermissions();
			permissions.add(permission);
			userSaved.setPermissions(permissions);;
			return this.update(user, userSaved);	
		}
		return userSaved;
	}
	
	public User removePermission(Long user, Permission permission) {
		User userSaved = get(user);
			List<Permission> permissions = userSaved.getPermissions();
			permissions.removeIf(x -> x.getCode() == permission.getCode());
			userSaved.setPermissions(permissions);;
			return this.update(user, userSaved);	
	}
}
