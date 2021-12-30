package br.ifsp.edu.dw.projectmanager.service;


import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import br.ifsp.edu.dw.projectmanager.domain.model.Sector;
import br.ifsp.edu.dw.projectmanager.repository.SectorRepository;

@Service
public class SectorService {

	@Autowired
	private SectorRepository sectorRepository;
	
	public Sector update(Long code, Sector sector) {
		Sector saved = get(code);
		BeanUtils.copyProperties(sector, saved, "code");
		return sectorRepository.save(saved);
	}

	public Sector get(Long code) {
		return sectorRepository.findById(code).orElseThrow();
	}
}
