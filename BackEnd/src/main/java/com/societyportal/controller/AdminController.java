package com.societyportal.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.societyportal.exception.ResourceNotFoundException;
import com.societyportal.model.Charges;
import com.societyportal.model.Flats;
import com.societyportal.model.Members;
import com.societyportal.model.Visitors;
import com.societyportal.repository.ChargeRepository;
import com.societyportal.repository.FlatRepository;
import com.societyportal.repository.MemberRepository;
import com.societyportal.repository.VisitorRepository;


@RestController
@RequestMapping("/society/admin")
public class AdminController {
	
	@Autowired
	private FlatRepository flatRepository;
	
	@Autowired
	private MemberRepository memberRepository;
	
	@Autowired
	private VisitorRepository visitorRepository; 
	
	@Autowired
	private ChargeRepository chargeRepository;
	
	@GetMapping("/flats")
	public List<Flats> getAllFlats(){
		return flatRepository.findAll();
	}
	
	@GetMapping("/members")
	public List<Members> getAllMembers(){
		return memberRepository.findAll();
	}
	
	@GetMapping("/visitors")
	public List<Visitors> getAllVisitors(){
		return visitorRepository.findAll();
	}
	
	@GetMapping("/charges")
	public List<Charges> getAllCharges(){
		return chargeRepository.findAll();
	}
	
	@PostMapping("/flats")
	public Flats createFlat(@RequestBody Flats flat){
		return flatRepository.save(flat);
	}
	
	@PostMapping("/members")
	public Members createMember(@RequestBody Members member){
		return memberRepository.save(member);
	}
	
	@PostMapping("/visitors")
	public Visitors createVisitor(@RequestBody Visitors visitor) {
		return visitorRepository.save(visitor);
	}
	
	@PostMapping("/charges")
	public Charges createCharge(@RequestBody Charges charge) {
		return chargeRepository.save(charge);
	}
	
	@DeleteMapping("/flats/{flat_no}")
	public Map<String,Boolean> deleteFlatDetails(@PathVariable(value="flat_no") Integer flat_no) throws ResourceNotFoundException{
		Flats flat=flatRepository.findById(flat_no).orElseThrow(()->new ResourceNotFoundException("Flat not found by this number:"+flat_no));
		flatRepository.delete(flat);
		Map<String,Boolean>response=new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return response;
	}	
	
	@DeleteMapping("/members/{id}")
	public Map<String,Boolean> deleteMemberDetails(@PathVariable(value="id") Integer id) throws ResourceNotFoundException{
		Members member=memberRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Member not found by this id:"+id));
		memberRepository.delete(member);
		Map<String,Boolean>response=new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return response;
	}
	
	@DeleteMapping("/charges/{id}")
	public Map<String,Boolean> deleteChargeDetails(@PathVariable(value="id") Integer id) throws ResourceNotFoundException{
		Charges charge=chargeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Charge not found by this id:"+id));
		chargeRepository.delete(charge);
		Map<String,Boolean>response=new HashMap<>();
		response.put("deleted",Boolean.TRUE);
		return response;
	}
	
	  @PutMapping("/charges/{charge_id}/monthlycharge/{rent_charge}/{water_bill}/{electricity_bill}/{maintenance_charge}")
	    public ResponseEntity<Charges> addBill(@PathVariable(value = "charge_id") Integer id,
	    		@PathVariable(value = "rent_charge") Integer rent_charge,@PathVariable(value = "water_bill") Integer water_bill,
	    		@PathVariable(value = "electricity_bill") Integer electricity_bill,@PathVariable(value = "maintenance_charge") Integer maintenance_charge) throws ResourceNotFoundException {
	    	Charges charge=chargeRepository.findById(id)
	        .orElseThrow(() -> new ResourceNotFoundException("Charges not found for this id :: " + id));
	    	charge.setRent_charge(charge.getRent_charge() + rent_charge);
	    	charge.setWater_bill(charge.getWater_bill() + water_bill);
	    	charge.setElectricity_bill(charge.getElectricity_bill() + electricity_bill);
	    	charge.setMaintenance_charge(charge.getMaintenance_charge() + maintenance_charge);
	    	final Charges updatedBill = chargeRepository.save(charge);
	        return ResponseEntity.ok(updatedBill);
	  }
}