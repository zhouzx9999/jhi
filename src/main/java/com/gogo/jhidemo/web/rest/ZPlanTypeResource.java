package com.gogo.jhidemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gogo.jhidemo.domain.ZPlanType;
import com.gogo.jhidemo.repository.ZPlanTypeRepository;
import com.gogo.jhidemo.web.rest.errors.BadRequestAlertException;
import com.gogo.jhidemo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ZPlanType.
 */
@RestController
@RequestMapping("/api")
public class ZPlanTypeResource {

    private final Logger log = LoggerFactory.getLogger(ZPlanTypeResource.class);

    private static final String ENTITY_NAME = "zPlanType";

    private final ZPlanTypeRepository zPlanTypeRepository;

    public ZPlanTypeResource(ZPlanTypeRepository zPlanTypeRepository) {
        this.zPlanTypeRepository = zPlanTypeRepository;
    }

    /**
     * POST  /z-plan-types : Create a new zPlanType.
     *
     * @param zPlanType the zPlanType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zPlanType, or with status 400 (Bad Request) if the zPlanType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/z-plan-types")
    @Timed
    public ResponseEntity<ZPlanType> createZPlanType(@Valid @RequestBody ZPlanType zPlanType) throws URISyntaxException {
        log.debug("REST request to save ZPlanType : {}", zPlanType);
        if (zPlanType.getId() != null) {
            throw new BadRequestAlertException("A new zPlanType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZPlanType result = zPlanTypeRepository.save(zPlanType);
        return ResponseEntity.created(new URI("/api/z-plan-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /z-plan-types : Updates an existing zPlanType.
     *
     * @param zPlanType the zPlanType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zPlanType,
     * or with status 400 (Bad Request) if the zPlanType is not valid,
     * or with status 500 (Internal Server Error) if the zPlanType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/z-plan-types")
    @Timed
    public ResponseEntity<ZPlanType> updateZPlanType(@Valid @RequestBody ZPlanType zPlanType) throws URISyntaxException {
        log.debug("REST request to update ZPlanType : {}", zPlanType);
        if (zPlanType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZPlanType result = zPlanTypeRepository.save(zPlanType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zPlanType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /z-plan-types : get all the zPlanTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of zPlanTypes in body
     */
    @GetMapping("/z-plan-types")
    @Timed
    public List<ZPlanType> getAllZPlanTypes() {
        log.debug("REST request to get all ZPlanTypes");
        return zPlanTypeRepository.findAll();
    }

    /**
     * GET  /z-plan-types/:id : get the "id" zPlanType.
     *
     * @param id the id of the zPlanType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zPlanType, or with status 404 (Not Found)
     */
    @GetMapping("/z-plan-types/{id}")
    @Timed
    public ResponseEntity<ZPlanType> getZPlanType(@PathVariable Long id) {
        log.debug("REST request to get ZPlanType : {}", id);
        Optional<ZPlanType> zPlanType = zPlanTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zPlanType);
    }

    /**
     * DELETE  /z-plan-types/:id : delete the "id" zPlanType.
     *
     * @param id the id of the zPlanType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/z-plan-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteZPlanType(@PathVariable Long id) {
        log.debug("REST request to delete ZPlanType : {}", id);

        zPlanTypeRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
