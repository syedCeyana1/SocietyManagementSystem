package com.societyportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="members")
public class Members {
	@Id
	@Column(name="id",nullable=false)
	private Integer id;
	
	@Column(name="first_name",nullable=false)
	private String first_name;
	
	@Column(name="last_name",nullable=false)
	private String last_name;
	
	@Column(name="username",unique=true,nullable=false)
	private String username;
	
	@Column(name="password",nullable=false)
	private String password;
	
	@Column(name="gender",nullable=false)
	private char gender;
	
	@Column(name="age",nullable=false)
	private Integer age;
	
	@Column(name="aadhaar_number",nullable=false,unique=true)
	private String aadhaar_number;
	
	@Column(name="phone_number",unique=true,nullable=false)
	private Long phone_number;
	
	@ManyToOne
	@JoinColumn(name="flat_no")
	private Flats flat_no;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public char getGender() {
		return gender;
	}

	public void setGender(char gender) {
		this.gender = gender;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getAadhaar_number() {
		return aadhaar_number;
	}

	public void setAadhaar_number(String aadhaar_number) {
		this.aadhaar_number = aadhaar_number;
	}

	public Long getPhone_number() {
		return phone_number;
	}

	public void setPhone_number(Long phone_number) {
		this.phone_number = phone_number;
	}

	public Flats getFlat_no() {
		return flat_no;
	}

	public void setFlat_no(Flats flat_no) {
		this.flat_no = flat_no;
	}

}
