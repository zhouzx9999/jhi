package com.gogo.jhidemo.web.rest;

import com.gogo.jhidemo.JhiApp;

import com.gogo.jhidemo.domain.ZPlanType;
import com.gogo.jhidemo.repository.ZPlanTypeRepository;
import com.gogo.jhidemo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.gogo.jhidemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ZPlanTypeResource REST controller.
 *
 * @see ZPlanTypeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhiApp.class)
public class ZPlanTypeResourceIntTest {

    private static final String DEFAULT_TYPE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_TYPE_NAME = "BBBBBBBBBB";

    @Autowired
    private ZPlanTypeRepository zPlanTypeRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZPlanTypeMockMvc;

    private ZPlanType zPlanType;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZPlanTypeResource zPlanTypeResource = new ZPlanTypeResource(zPlanTypeRepository);
        this.restZPlanTypeMockMvc = MockMvcBuilders.standaloneSetup(zPlanTypeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ZPlanType createEntity(EntityManager em) {
        ZPlanType zPlanType = new ZPlanType()
            .typeName(DEFAULT_TYPE_NAME);
        return zPlanType;
    }

    @Before
    public void initTest() {
        zPlanType = createEntity(em);
    }

    @Test
    @Transactional
    public void createZPlanType() throws Exception {
        int databaseSizeBeforeCreate = zPlanTypeRepository.findAll().size();

        // Create the ZPlanType
        restZPlanTypeMockMvc.perform(post("/api/z-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zPlanType)))
            .andExpect(status().isCreated());

        // Validate the ZPlanType in the database
        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ZPlanType testZPlanType = zPlanTypeList.get(zPlanTypeList.size() - 1);
        assertThat(testZPlanType.getTypeName()).isEqualTo(DEFAULT_TYPE_NAME);
    }

    @Test
    @Transactional
    public void createZPlanTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zPlanTypeRepository.findAll().size();

        // Create the ZPlanType with an existing ID
        zPlanType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZPlanTypeMockMvc.perform(post("/api/z-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zPlanType)))
            .andExpect(status().isBadRequest());

        // Validate the ZPlanType in the database
        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTypeNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = zPlanTypeRepository.findAll().size();
        // set the field null
        zPlanType.setTypeName(null);

        // Create the ZPlanType, which fails.

        restZPlanTypeMockMvc.perform(post("/api/z-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zPlanType)))
            .andExpect(status().isBadRequest());

        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZPlanTypes() throws Exception {
        // Initialize the database
        zPlanTypeRepository.saveAndFlush(zPlanType);

        // Get all the zPlanTypeList
        restZPlanTypeMockMvc.perform(get("/api/z-plan-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zPlanType.getId().intValue())))
            .andExpect(jsonPath("$.[*].typeName").value(hasItem(DEFAULT_TYPE_NAME.toString())));
    }
    
    @Test
    @Transactional
    public void getZPlanType() throws Exception {
        // Initialize the database
        zPlanTypeRepository.saveAndFlush(zPlanType);

        // Get the zPlanType
        restZPlanTypeMockMvc.perform(get("/api/z-plan-types/{id}", zPlanType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zPlanType.getId().intValue()))
            .andExpect(jsonPath("$.typeName").value(DEFAULT_TYPE_NAME.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingZPlanType() throws Exception {
        // Get the zPlanType
        restZPlanTypeMockMvc.perform(get("/api/z-plan-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZPlanType() throws Exception {
        // Initialize the database
        zPlanTypeRepository.saveAndFlush(zPlanType);

        int databaseSizeBeforeUpdate = zPlanTypeRepository.findAll().size();

        // Update the zPlanType
        ZPlanType updatedZPlanType = zPlanTypeRepository.findById(zPlanType.getId()).get();
        // Disconnect from session so that the updates on updatedZPlanType are not directly saved in db
        em.detach(updatedZPlanType);
        updatedZPlanType
            .typeName(UPDATED_TYPE_NAME);

        restZPlanTypeMockMvc.perform(put("/api/z-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZPlanType)))
            .andExpect(status().isOk());

        // Validate the ZPlanType in the database
        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeUpdate);
        ZPlanType testZPlanType = zPlanTypeList.get(zPlanTypeList.size() - 1);
        assertThat(testZPlanType.getTypeName()).isEqualTo(UPDATED_TYPE_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingZPlanType() throws Exception {
        int databaseSizeBeforeUpdate = zPlanTypeRepository.findAll().size();

        // Create the ZPlanType

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZPlanTypeMockMvc.perform(put("/api/z-plan-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zPlanType)))
            .andExpect(status().isBadRequest());

        // Validate the ZPlanType in the database
        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZPlanType() throws Exception {
        // Initialize the database
        zPlanTypeRepository.saveAndFlush(zPlanType);

        int databaseSizeBeforeDelete = zPlanTypeRepository.findAll().size();

        // Get the zPlanType
        restZPlanTypeMockMvc.perform(delete("/api/z-plan-types/{id}", zPlanType.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ZPlanType> zPlanTypeList = zPlanTypeRepository.findAll();
        assertThat(zPlanTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZPlanType.class);
        ZPlanType zPlanType1 = new ZPlanType();
        zPlanType1.setId(1L);
        ZPlanType zPlanType2 = new ZPlanType();
        zPlanType2.setId(zPlanType1.getId());
        assertThat(zPlanType1).isEqualTo(zPlanType2);
        zPlanType2.setId(2L);
        assertThat(zPlanType1).isNotEqualTo(zPlanType2);
        zPlanType1.setId(null);
        assertThat(zPlanType1).isNotEqualTo(zPlanType2);
    }
}
