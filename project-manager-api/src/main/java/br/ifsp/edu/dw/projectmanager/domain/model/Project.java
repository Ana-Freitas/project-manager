package br.ifsp.edu.dw.projectmanager.domain.model;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "projects")
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	
	@NotNull
	@Size(min = 3, max = 50)
	private String name;
	
	@NotNull
	@Size(min = 3, max = 100)
	private String description;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "start_date")
	private LocalDate startDate;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "end_date")
	private LocalDate endDate;
	private Boolean active;
	
	@ManyToOne
	@JoinColumn(name = "sector")
	private Sector sector;
	
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getCode() {
		return code;
	}
	public LocalDate getStartDate() {
		return startDate;
	}
	public void setStartDate(LocalDate startDate) {
		this.startDate = startDate;
	}
	public LocalDate getEndDate() {
		return endDate;
	}
	public void setEndDate(LocalDate endDate) {
		this.endDate = endDate;
	}
	public Boolean isActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Sector getSector() {
		return this.sector;
	}
	public void setSector(Sector sector) {
		this.sector = sector;
	}

	
	@Override
	public int hashCode() {
		return Objects.hash(code);
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Project other = (Project) obj;
		return Objects.equals(code, other.code);
	}
}
