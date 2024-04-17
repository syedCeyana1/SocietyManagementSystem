package com.societyportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.societyportal.model.Members;

public interface MemberRepository extends JpaRepository<Members, Integer> {

}
