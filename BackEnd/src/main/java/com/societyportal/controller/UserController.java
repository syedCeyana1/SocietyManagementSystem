package com.societyportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.societyportal.exception.ResourceNotFoundException;
import com.societyportal.model.Charges;
import com.societyportal.repository.ChargeRepository;

@RestController
@RequestMapping("/society/users")
public class UserController {
	@Autowired
	private ChargeRepository chargeRepository;
	
	@GetMapping("/charges")
	public List<Charges> getAllCharges(){
		return chargeRepository.findAll();
	}
	
	  @PutMapping("/charges/{charge_id}/deposit/{rent_charge}/{water_bill}/{electricity_bill}/{maintenance_charge}")
	    public ResponseEntity<Charges> depositBill(@PathVariable(value = "charge_id") Integer charge_id,
	    		@PathVariable(value = "rent_charge") Integer rent_charge,@PathVariable(value = "water_bill") Integer water_bill,
	    		@PathVariable(value = "electricity_bill") Integer electricity_bill,@PathVariable(value = "maintenance_charge") Integer maintenance_charge) throws ResourceNotFoundException {
	    	Charges charge=chargeRepository.findById(charge_id)
	        .orElseThrow(() -> new ResourceNotFoundException("Charges not found for this id :: " + charge_id));
	    	charge.setRent_charge(charge.getRent_charge() - rent_charge);
	    	charge.setWater_bill(charge.getWater_bill() - water_bill);
	    	charge.setElectricity_bill(charge.getElectricity_bill() - electricity_bill);
	    	charge.setMaintenance_charge(charge.getMaintenance_charge() - maintenance_charge);
	    	final Charges updatedBill = chargeRepository.save(charge);
	        return ResponseEntity.ok(updatedBill);
	  }
}
