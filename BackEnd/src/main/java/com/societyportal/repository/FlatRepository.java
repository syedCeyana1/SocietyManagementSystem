package com.societyportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.societyportal.model.Flats;

@Repository
public interface FlatRepository extends JpaRepository<Flats, Integer>{

}
