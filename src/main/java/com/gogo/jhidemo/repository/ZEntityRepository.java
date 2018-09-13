package com.gogo.jhidemo.repository;

import com.gogo.jhidemo.domain.ZEntity;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the ZEntity entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ZEntityRepository extends JpaRepository<ZEntity, Long> {

    @Query("select zentity from ZEntity zentity where zentity.creater.login = ?#{principal.username}")
    List<ZEntity> findByCreaterIsCurrentUser();

}
