package br.ifsp.edu.dw.projectmanager.resource;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import br.ifsp.edu.dw.projectmanager.domain.model.Sector;
import br.ifsp.edu.dw.projectmanager.repository.SectorRepository;
import br.ifsp.edu.dw.projectmanager.service.SectorService;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("/sector")
public class SectorResource {
	
	@Autowired
	private SectorRepository sectorRepository;
	
	@Autowired
	private SectorService sectorService;
	
	@GetMapping
	public List<Sector> sectors(){
		return sectorRepository.findAll();
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Sector create(@Valid @RequestBody Sector sector) {
		return sectorRepository.save(sector);
	}
	
	@GetMapping("/{code}")
	public ResponseEntity<Sector> getById(@PathVariable Long code){
		Optional<Sector> sector = sectorRepository.findById(code);
		if(sector.isPresent()) {
			return ResponseEntity.ok(sector.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{code}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void remove(@PathVariable Long code) {
		sectorRepository.deleteById(code);
	}
	
	@PutMapping("/{code}")
	public ResponseEntity<Sector> update(@PathVariable Long code, @RequestBody Sector sector) {
		Sector saved = sectorService.update(code, sector);
		return ResponseEntity.ok(saved);
	}
}
