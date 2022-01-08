package br.ifsp.edu.dw.projectmanager.service;

import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.ProjectEmployee;
import br.ifsp.edu.dw.projectmanager.repository.ProjectEmployeeRepository;

@Service
public class ProjectEmployeeService {
	/*@Autowired
	private ProjectEmployeeRepository projectEmployeeRepository;
	
	public ProjectEmployee toSave(Lancamento lancamento) {
		Optional<Pessoa> pessoa = pessoaRepository.findById(lancamento.getPessoa().getCodigo());
		if(!pessoa.isPresent() || !pessoa.get().isAtivo()) {
			throw new PessoaInexistenteOuInativaException();
		}
		
		return lancamentoRepository.save(lancamento);
	}
	
	public ProjectEmployee update(Long code, ProjectEmployee projectEmployee) {
		ProjectEmployee saved = get(code);
		BeanUtils.copyProperties(projectEmployee, saved, "code");
		return projectEmployeeRepository.save(saved);
	}

	public ProjectEmployee get(Long code) {
		return projectEmployeeRepository.findById(code).orElseThrow();
	}*/
}
