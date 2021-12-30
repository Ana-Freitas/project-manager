package br.ifsp.edu.dw.projectmanager.domain.model;

import java.time.LocalDate;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "project_employee")
public class ProjectEmployee {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	private Integer workload;
	private Boolean manager;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "start_participation")
	private LocalDate startParticipation;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	@Column(name = "end_participation")
	private LocalDate endParticipation;
	
	@ManyToOne
	@JoinColumn(name = "employees")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name = "projects")
	private User project;
	
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
	
	public Employee getEmployee() {
		return employee;
	}
	public void setEmployee(Employee employee) {
		this.employee = employee;
	}
	public User getProject() {
		return project;
	}
	public void setProject(User project) {
		this.project = project;
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
