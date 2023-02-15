package com.campigoto.campservice.repositories;

import com.campigoto.campservice.entities.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CustumerRepository extends JpaRepository<Customer, Long> {
    @Transactional(readOnly = true)
    Customer findByEmailAddress(String email);
}
