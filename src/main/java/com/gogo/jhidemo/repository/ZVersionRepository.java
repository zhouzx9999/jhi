package com.gogo.jhidemo.repository;

import com.gogo.jhidemo.domain.ZVersion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ZVersion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZVersionRepository extends JpaRepository<ZVersion, Long> {

}
