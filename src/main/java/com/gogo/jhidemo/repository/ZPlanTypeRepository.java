package com.gogo.jhidemo.repository;

import com.gogo.jhidemo.domain.ZPlanType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ZPlanType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZPlanTypeRepository extends JpaRepository<ZPlanType, Long> {

}
