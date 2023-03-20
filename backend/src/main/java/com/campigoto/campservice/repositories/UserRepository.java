package com.campigoto.campservice.repositories;


import com.campigoto.campservice.dto.UserFilterDto;
import com.campigoto.campservice.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);

    @Query("""
             select u from User u 
             where 
             (COALESCE(:#{#filter.searchTerm}) IS NULL) OR 
             (:#{#filter.property} = 'firstName' AND LOWER(u.firstName) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'lastName' AND LOWER(u.lastName) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
             OR (:#{#filter.property} = 'email' AND LOWER(u.email) LIKE CONCAT('%', LOWER(:#{#filter.searchTerm}), '%'))
            """)
    Page<User> findByTerm(@Param("filter") UserFilterDto filter, Pageable pageable);
}