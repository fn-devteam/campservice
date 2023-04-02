package com.campigoto.campservice.repositories;

import com.campigoto.campservice.dto.SupplierFilterDto;
import com.campigoto.campservice.entities.Supplier;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface SupplierRepository extends JpaRepository<Supplier, Long> {
    @Transactional(readOnly = true)
    Supplier findByEmailAddress(String email);


    @Query("""
             select s from Supplier s
             where 
             (COALESCE(:#{#filter.searchTerm}) IS NULL) OR 
             (:#{#filter.property} = 'name' AND LOWER(s.name) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'fantasyName' AND LOWER(s.fantasyName) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'cpfCnpj' AND LOWER(s.cpfCnpj) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
            """)
    Page<Supplier> findByTerm(@Param("filter") SupplierFilterDto filter, Pageable pageable);
}
