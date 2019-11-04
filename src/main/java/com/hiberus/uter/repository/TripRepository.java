package com.hiberus.uter.repository;
import com.hiberus.uter.domain.Trip;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Trip entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

}
