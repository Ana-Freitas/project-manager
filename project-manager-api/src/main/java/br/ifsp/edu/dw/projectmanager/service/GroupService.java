package br.ifsp.edu.dw.projectmanager.service;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Group;
import br.ifsp.edu.dw.projectmanager.repository.GroupRepository;

@Service
public class GroupService {
	@Autowired
	private GroupRepository groupRepository;
	
	public Group update(Long code, @Valid Group sector) {
		Group saved = get(code);
		BeanUtils.copyProperties(sector, saved, "code");
		return groupRepository.save(saved);
	}

	public Group get(Long code) {
		return groupRepository.findById(code).orElseThrow();
	}
}
