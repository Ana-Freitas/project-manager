package br.ifsp.edu.dw.projectmanager.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.ifsp.edu.dw.projectmanager.domain.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}
