package com.gogo.jhidemo.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.gogo.jhidemo.service.ZEntityService;
import com.gogo.jhidemo.web.rest.errors.BadRequestAlertException;
import com.gogo.jhidemo.web.rest.util.HeaderUtil;
import com.gogo.jhidemo.web.rest.util.PaginationUtil;
import com.gogo.jhidemo.service.dto.ZEntityDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ZEntity.
 */
@RestController
@RequestMapping("/api")
public class ZEntityResource {

    private final Logger log = LoggerFactory.getLogger(ZEntityResource.class);

    private static final String ENTITY_NAME = "zEntity";

    private final ZEntityService zEntityService;

    public ZEntityResource(ZEntityService zEntityService) {
        this.zEntityService = zEntityService;
    }

    /**
     * POST  /z-entities : Create a new zEntity.
     *
     * @param zEntityDTO the zEntityDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new zEntityDTO, or with status 400 (Bad Request) if the zEntity has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/z-entities")
    @Timed
    public ResponseEntity<ZEntityDTO> createZEntity(@Valid @RequestBody ZEntityDTO zEntityDTO) throws URISyntaxException {
        log.debug("REST request to save ZEntity : {}", zEntityDTO);
        if (zEntityDTO.getId() != null) {
            throw new BadRequestAlertException("A new zEntity cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ZEntityDTO result = zEntityService.save(zEntityDTO);
        return ResponseEntity.created(new URI("/api/z-entities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /z-entities : Updates an existing zEntity.
     *
     * @param zEntityDTO the zEntityDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated zEntityDTO,
     * or with status 400 (Bad Request) if the zEntityDTO is not valid,
     * or with status 500 (Internal Server Error) if the zEntityDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/z-entities")
    @Timed
    public ResponseEntity<ZEntityDTO> updateZEntity(@Valid @RequestBody ZEntityDTO zEntityDTO) throws URISyntaxException {
        log.debug("REST request to update ZEntity : {}", zEntityDTO);
        if (zEntityDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ZEntityDTO result = zEntityService.save(zEntityDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, zEntityDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /z-entities : get all the zEntities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of zEntities in body
     */
    @GetMapping("/z-entities")
    @Timed
    public ResponseEntity<List<ZEntityDTO>> getAllZEntities(Pageable pageable) {
        log.debug("REST request to get a page of ZEntities");
        Page<ZEntityDTO> page = zEntityService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/z-entities");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /z-entities/:id : get the "id" zEntity.
     *
     * @param id the id of the zEntityDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the zEntityDTO, or with status 404 (Not Found)
     */
    @GetMapping("/z-entities/{id}")
    @Timed
    public ResponseEntity<ZEntityDTO> getZEntity(@PathVariable Long id) {
        log.debug("REST request to get ZEntity : {}", id);
        Optional<ZEntityDTO> zEntityDTO = zEntityService.findOne(id);
        return ResponseUtil.wrapOrNotFound(zEntityDTO);
    }

    /**
     * DELETE  /z-entities/:id : delete the "id" zEntity.
     *
     * @param id the id of the zEntityDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/z-entities/{id}")
    @Timed
    public ResponseEntity<Void> deleteZEntity(@PathVariable Long id) {
        log.debug("REST request to delete ZEntity : {}", id);
        zEntityService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
