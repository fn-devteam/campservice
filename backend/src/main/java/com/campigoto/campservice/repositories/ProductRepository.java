package com.campigoto.campservice.repositories;

import com.campigoto.campservice.dto.ProductFilterDto;
import com.campigoto.campservice.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("""
             select p from Product p 
             where 
             (COALESCE(:#{#filter.searchTerm}) IS NULL) OR 
             (:#{#filter.property} = 'description' AND LOWER(p.description) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'originalCode' AND LOWER(p.originalCode) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'originalCode1' AND LOWER(p.originalCode1) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
            """)
    Page<Product> findByTerm(@Param("filter") ProductFilterDto filter, Pageable pageable);

}
