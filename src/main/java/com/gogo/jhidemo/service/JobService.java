package com.gogo.jhidemo.service;

import com.gogo.jhidemo.service.dto.JobDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Job.
 */
public interface JobService {

    /**
     * Save a job.
     *
     * @param jobDTO the entity to save
     * @return the persisted entity
     */
    JobDTO save(JobDTO jobDTO);

    /**
     * Get all the jobs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<JobDTO> findAll(Pageable pageable);

    /**
     * Get all the Job with eager load of many-to-many relationships.
     *
     * @return the list of entities
     */
    Page<JobDTO> findAllWithEagerRelationships(Pageable pageable);
    
    /**
     * Get the "id" job.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<JobDTO> findOne(Long id);

    /**
     * Delete the "id" job.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
