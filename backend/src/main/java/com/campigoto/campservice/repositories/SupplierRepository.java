package com.campigoto.campservice.repositories;
import com.campigoto.campservice.entities.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
	
	@Transactional(readOnly=true)
	Supplier findByEmailAddress(String email);

}
