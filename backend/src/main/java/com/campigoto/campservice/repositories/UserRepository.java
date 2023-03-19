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
             where (COALESCE(:#{#filter.firstName}) IS NULL OR LOWER(u.firstName) LIKE CONCAT('%', LOWER(:#{#filter.firstName}), '%'))
             AND (COALESCE(:#{#filter.lastName}) IS NULL OR LOWER(u.lastName) LIKE CONCAT('%', LOWER(:#{#filter.lastName}), '%'))
             AND (COALESCE(:#{#filter.email}) IS NULL OR LOWER(u.email) LIKE CONCAT('%', LOWER(:#{#filter.email}), '%'))
            """)
    Page<User> findByTerm(@Param("filter") UserFilterDto filter, Pageable pageable);
}