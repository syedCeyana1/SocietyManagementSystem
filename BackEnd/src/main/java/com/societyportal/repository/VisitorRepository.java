package com.societyportal.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.societyportal.model.Visitors;

@Repository
public interface VisitorRepository extends JpaRepository<Visitors, Integer>{

}
