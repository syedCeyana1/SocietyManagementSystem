package com.societyportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="flats")
public class Flats {
	@Id
	@Column(name="flat_no",nullable=false,unique=true)
	private Integer flat_no;
	
	@Column(name="floor_no",nullable=false)
	private Integer floor_no;
	
	@Column(name="block_no",nullable=false)
	private String block_no;
	
	public Integer getFlat_no() {
		return flat_no;
	}
	public void setFlat_no(Integer flat_no) {
		this.flat_no = flat_no;
	}
	public Integer getFloor_no() {
		return floor_no;
	}
	public void setFloor_no(Integer floor_no) {
		this.floor_no = floor_no;
	}
	public String getBlock_no() {
		return block_no;
	}
	public void setBlock_no(String block_no) {
		this.block_no = block_no;
	}
	
}
