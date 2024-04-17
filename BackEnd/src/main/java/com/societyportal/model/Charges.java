package com.societyportal.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name="charges")
public class Charges {
	@Id
	@Column(name="charge_id",nullable=false)
	private Integer charge_id;
	
	@Column(name="rent_charge")
	private Integer rent_charge;
	
	@Column(name="water_bill")
	private Integer water_bill;
	
	@Column(name="electricity_bill")
	private Integer electricity_bill;
	
	@Column(name="maintenance_charge")
	private Integer maintenance_charge;
	
	@ManyToOne
	@JoinColumn(name="flat_no",unique=true)
	private Flats flat_no;
	
	public Integer getCharge_id() {
		return charge_id;
	}
	public void setCharge_id(Integer charge_id) {
		this.charge_id = charge_id;
	}
	public Integer getRent_charge() {
		return rent_charge;
	}
	public void setRent_charge(Integer rent_charge) {
		this.rent_charge = rent_charge;
	}
	public Integer getWater_bill() {
		return water_bill;
	}
	public void setWater_bill(Integer water_bill) {
		this.water_bill = water_bill;
	}
	public Integer getElectricity_bill() {
		return electricity_bill;
	}
	public void setElectricity_bill(Integer electricity_bill) {
		this.electricity_bill = electricity_bill;
	}
	public Integer getMaintenance_charge() {
		return maintenance_charge;
	}
	public void setMaintenance_charge(Integer maintenance_charge) {
		this.maintenance_charge = maintenance_charge;
	}
	public Flats getFlat_no() {
		return flat_no;
	}
	public void setFlat_no(Flats flat_no) {
		this.flat_no = flat_no;
	}
	
}
