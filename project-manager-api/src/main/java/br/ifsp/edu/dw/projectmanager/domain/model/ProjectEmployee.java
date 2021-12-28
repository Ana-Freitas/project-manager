package br.ifsp.edu.dw.projectmanager.domain.model;

import java.time.LocalDate;
import java.util.Objects;

public class ProjectEmployee {
	private Long code;
	private Integer workload;
	private Boolean manager;
	private LocalDate startParticipation;
	private LocalDate endParticipation;
	public Integer getWorkload() {
		return workload;
	}
	public void setWorkload(Integer workload) {
		this.workload = workload;
	}
	public Boolean getManager() {
		return manager;
	}
	public void setManager(Boolean manager) {
		this.manager = manager;
	}
	public LocalDate getStartParticipation() {
		return startParticipation;
	}
	public void setStartParticipation(LocalDate startParticipation) {
		this.startParticipation = startParticipation;
	}
	public LocalDate getEndParticipation() {
		return endParticipation;
	}
	public void setEndParticipation(LocalDate endParticipation) {
		this.endParticipation = endParticipation;
	}
	public Long getCode() {
		return code;
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
		ProjectEmployee other = (ProjectEmployee) obj;
		return Objects.equals(code, other.code);
	}
	
	
}