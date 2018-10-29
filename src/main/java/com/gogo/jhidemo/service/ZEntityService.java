package com.gogo.jhidemo.service;

import com.gogo.jhidemo.domain.ZEntity;
import com.gogo.jhidemo.repository.ZEntityRepository;
import com.gogo.jhidemo.service.dto.ZEntityDTO;
import com.gogo.jhidemo.service.mapper.ZEntityMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing ZEntity.
 */
@Service
@Transactional
public class ZEntityService {

    private final Logger log = LoggerFactory.getLogger(ZEntityService.class);

    private ZEntityRepository zEntityRepository;

    private ZEntityMapper zEntityMapper;

    public ZEntityService(ZEntityRepository zEntityRepository, ZEntityMapper zEntityMapper) {
        this.zEntityRepository = zEntityRepository;
        this.zEntityMapper = zEntityMapper;
    }

    /**
     * Save a zEntity.
     *
     * @param zEntityDTO the entity to save
     * @return the persisted entity
     */
    public ZEntityDTO save(ZEntityDTO zEntityDTO) {
        log.debug("Request to save ZEntity : {}", zEntityDTO);

        ZEntity zEntity = zEntityMapper.toEntity(zEntityDTO);
        zEntity = zEntityRepository.save(zEntity);
        return zEntityMapper.toDto(zEntity);
    }

    /**
     * Get all the zEntities.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<ZEntityDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ZEntities");
        return zEntityRepository.findAll(pageable)
            .map(zEntityMapper::toDto);
    }


    /**
     * Get one zEntity by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<ZEntityDTO> findOne(Long id) {
        log.debug("Request to get ZEntity : {}", id);
        return zEntityRepository.findById(id)
            .map(zEntityMapper::toDto);
    }

    /**
     * Delete the zEntity by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete ZEntity : {}", id);
        zEntityRepository.deleteById(id);
    }
}
