package com.societyportal.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="")
public class Visitors {
	@Id
	@Column(name="visitor_id",nullable=false)
	private Integer visitor_id;
	
	@Column(name="name",nullable=false)
	private String name;
	
	@Column(name="phone_no",nullable=false)
	private Long phone_no;
	
	@Column(name="address",nullable=false)
	private String address;
	
	@Column(name="visitors_pass_id",unique=true,nullable=false)
	private Integer visitors_pass_id;
	
	@Column(name="checkin_time",nullable=false)
	private Date checkin_time;
	
	@Column(name="checkout_time",nullable=false)
	private Date checkout_time;
	
	@ManyToOne
	@JoinColumn(name="flat_no")
	private Flats flat_no;
	
	public Integer getVisitor_id() {
		return visitor_id;
	}
	public void setVisitor_id(Integer visitor_id) {
		this.visitor_id = visitor_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Long getPhone_no() {
		return phone_no;
	}
	public void setPhone_no(Long phone_no) {
		this.phone_no = phone_no;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public Integer getVisitors_pass_id() {
		return visitors_pass_id;
	}
	public void setVisitors_pass_id(Integer visitors_pass_id) {
		this.visitors_pass_id = visitors_pass_id;
	}
	public Date getCheckin_time() {
		return checkin_time;
	}
	public void setCheckin_time(Date checkin_time) {
		this.checkin_time = checkin_time;
	}
	public Date getCheckout_time() {
		return checkout_time;
	}
	public void setCheckout_time(Date checkout_time) {
		this.checkout_time = checkout_time;
	}
	public Flats getFlat_no() {
		return flat_no;
	}
	public void setFlat_no(Flats flat_no) {
		this.flat_no = flat_no;
	}
	
}
