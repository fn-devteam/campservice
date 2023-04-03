package com.campigoto.campservice.repositories;

import com.campigoto.campservice.dto.GroupFilterDto;
import com.campigoto.campservice.entities.ProductGroup;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductGroupRepository extends JpaRepository<ProductGroup, Long> {

    @Query("""
             select g from ProductGroup g
             where
             (COALESCE(:#{#filter.searchTerm}) IS NULL) OR
             (:#{#filter.property} = 'groupName' AND LOWER(g.groupName) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
            """)
    Page<ProductGroup> findByTerm(@Param("filter") GroupFilterDto filter, Pageable pageable);


}
