package br.ifsp.edu.dw.projectmanager.domain.model;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.validator.constraints.br.CPF;

@Entity
@Table(name = "employees")
public class Employee {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long code;
	
	@NotNull
	@Size(min = 3, max = 50)
	private String name;
	
	@NotNull
	@CPF
	private String cpf;
	
	@ManyToOne
	@JoinColumn(name = "groups")
	private Group group;
	
	@ManyToOne
	@JoinColumn(name = "sectors")
	private Sector sector;
	
	@OneToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "project_employee", joinColumns = @JoinColumn(name = "employee"))
	private List<ProjectEmployee> alocations;
	
	private BigDecimal salary;
	private Boolean active;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getCpf() {
		return cpf;
	}
	public void setCpf(String cpf) {
		this.cpf = cpf;
	}
	public BigDecimal getSalary() {
		return salary;
	}
	public void setSalary(BigDecimal salary) {
		this.salary = salary;
	}
	public Boolean isActive() {
		return active;
	}
	public void setActive(Boolean active) {
		this.active = active;
	}
	public Long getCode() {
		return code;
	}
	public Group getGroup() {
		return this.group;
	}
	public void setGroup(Group group) {
		this.group = group;
	}
	public Sector getSector() {
		return this.sector;
	}
	public void setSector(Sector sector) {
		this.sector = sector;
	}
	
	public List<ProjectEmployee> getAlocations() {
		return alocations;
	}
	public void setAlocations(List<ProjectEmployee> alocations) {
		this.alocations = alocations;
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
		Employee other = (Employee) obj;
		return Objects.equals(code, other.code);
	}
}
