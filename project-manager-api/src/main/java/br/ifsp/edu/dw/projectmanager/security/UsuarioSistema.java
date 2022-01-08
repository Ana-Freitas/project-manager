package br.ifsp.edu.dw.projectmanager.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

import br.ifsp.edu.dw.projectmanager.domain.model.User;

public class UsuarioSistema extends org.springframework.security.core.userdetails.User {

	private static final long serialVersionUID = 1L;
	private User user;
	
	public UsuarioSistema(User user, Collection<? extends GrantedAuthority> authorities) {
		super(user.getEmail(), user.getPassword(), authorities);
		this.user = user;
	}
	
	public User getUser() {
		return user;
	}
}