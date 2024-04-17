package com.societyportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.societyportal.model.Charges;

@Repository
public interface ChargeRepository extends JpaRepository<Charges, Integer>{

}
