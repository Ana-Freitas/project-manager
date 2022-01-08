package br.ifsp.edu.dw.projectmanager.security;

import java.util.Collection;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.User;
import br.ifsp.edu.dw.projectmanager.repository.UserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private MessageSource messageSource;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Optional<User> usuarioOptional = userRepository.findByEmail(email);
		User user = usuarioOptional.orElseThrow(
				() -> new UsernameNotFoundException(messageSource.getMessage("mensagem.usuario-invalido", null, LocaleContextHolder.getLocale())));
		
		return new UsuarioSistema(user, getPermissoes(user));
	}

	private Collection<? extends GrantedAuthority> getPermissoes(User user) {
		Set<SimpleGrantedAuthority> authorities = new HashSet<>();		
		user.getPermissions().forEach(p -> authorities.add(new SimpleGrantedAuthority(p.getDescription().toUpperCase())));

		return authorities;
	}

}
