package com.gogo.jhidemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gogo.jhidemo.domain.ZVersion;
import com.gogo.jhidemo.repository.ZVersionRepository;
import com.gogo.jhidemo.web.rest.errors.BadRequestAlertException;
import com.gogo.jhidemo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ZVersion.
 */
@RestController
@RequestMapping("/api")
public class ZVersionResource {

    private final Logger log = LoggerFactory.getLogger(ZVersionResource.class);

    private static final String ENTITY_NAME = "zVersion";

    private final ZVersionRepository zVersionRepository;

    public ZVersionResource(ZVersionRepository zVersionRepository) {
        this.zVersionRepository = zVersionRepository;
    }

    /**
     * POST  /z-versions : Create a new zVersion.
     *
     * @param zVersion the zVersion to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zVersion, or with status 400 (Bad Request) if the zVersion has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/z-versions")
    @Timed
    public ResponseEntity<ZVersion> createZVersion(@RequestBody ZVersion zVersion) throws URISyntaxException {
        log.debug("REST request to save ZVersion : {}", zVersion);
        if (zVersion.getId() != null) {
            throw new BadRequestAlertException("A new zVersion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZVersion result = zVersionRepository.save(zVersion);
        return ResponseEntity.created(new URI("/api/z-versions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /z-versions : Updates an existing zVersion.
     *
     * @param zVersion the zVersion to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zVersion,
     * or with status 400 (Bad Request) if the zVersion is not valid,
     * or with status 500 (Internal Server Error) if the zVersion couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/z-versions")
    @Timed
    public ResponseEntity<ZVersion> updateZVersion(@RequestBody ZVersion zVersion) throws URISyntaxException {
        log.debug("REST request to update ZVersion : {}", zVersion);
        if (zVersion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZVersion result = zVersionRepository.save(zVersion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zVersion.getId().toString()))
            .body(result);
    }

    /**
     * GET  /z-versions : get all the zVersions.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of zVersions in body
     */
    @GetMapping("/z-versions")
    @Timed
    public List<ZVersion> getAllZVersions() {
        log.debug("REST request to get all ZVersions");
        return zVersionRepository.findAll();
    }

    /**
     * GET  /z-versions/:id : get the "id" zVersion.
     *
     * @param id the id of the zVersion to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zVersion, or with status 404 (Not Found)
     */
    @GetMapping("/z-versions/{id}")
    @Timed
    public ResponseEntity<ZVersion> getZVersion(@PathVariable Long id) {
        log.debug("REST request to get ZVersion : {}", id);
        Optional<ZVersion> zVersion = zVersionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(zVersion);
    }

    /**
     * DELETE  /z-versions/:id : delete the "id" zVersion.
     *
     * @param id the id of the zVersion to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/z-versions/{id}")
    @Timed
    public ResponseEntity<Void> deleteZVersion(@PathVariable Long id) {
        log.debug("REST request to delete ZVersion : {}", id);

        zVersionRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
