package com.gogo.jhidemo.web.rest;

import com.gogo.jhidemo.JhiApp;

import com.gogo.jhidemo.domain.ZEntity;
import com.gogo.jhidemo.repository.ZEntityRepository;
import com.gogo.jhidemo.service.ZEntityService;
import com.gogo.jhidemo.service.dto.ZEntityDTO;
import com.gogo.jhidemo.service.mapper.ZEntityMapper;
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
 * Test class for the ZEntityResource REST controller.
 *
 * @see ZEntityResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhiApp.class)
public class ZEntityResourceIntTest {

    private static final String DEFAULT_ENTITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ENTITY_ABBRE = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_ABBRE = "BBBBBBBBBB";

    private static final String DEFAULT_ENTITY_STD_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_STD_NAME = "BBBBBBBBBB";

    private static final Integer DEFAULT_ENTITY_TYPE = 1;
    private static final Integer UPDATED_ENTITY_TYPE = 2;

    private static final Integer DEFAULT_IS_GUI_KOU = 1;
    private static final Integer UPDATED_IS_GUI_KOU = 2;

    @Autowired
    private ZEntityRepository zEntityRepository;

    @Autowired
    private ZEntityMapper zEntityMapper;
    
    @Autowired
    private ZEntityService zEntityService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZEntityMockMvc;

    private ZEntity zEntity;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZEntityResource zEntityResource = new ZEntityResource(zEntityService);
        this.restZEntityMockMvc = MockMvcBuilders.standaloneSetup(zEntityResource)
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
    public static ZEntity createEntity(EntityManager em) {
        ZEntity zEntity = new ZEntity()
            .entityName(DEFAULT_ENTITY_NAME)
            .entityAbbre(DEFAULT_ENTITY_ABBRE)
            .entityStdName(DEFAULT_ENTITY_STD_NAME)
            .entityType(DEFAULT_ENTITY_TYPE)
            .isGuiKou(DEFAULT_IS_GUI_KOU);
        return zEntity;
    }

    @Before
    public void initTest() {
        zEntity = createEntity(em);
    }

    @Test
    @Transactional
    public void createZEntity() throws Exception {
        int databaseSizeBeforeCreate = zEntityRepository.findAll().size();

        // Create the ZEntity
        ZEntityDTO zEntityDTO = zEntityMapper.toDto(zEntity);
        restZEntityMockMvc.perform(post("/api/z-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zEntityDTO)))
            .andExpect(status().isCreated());

        // Validate the ZEntity in the database
        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeCreate + 1);
        ZEntity testZEntity = zEntityList.get(zEntityList.size() - 1);
        assertThat(testZEntity.getEntityName()).isEqualTo(DEFAULT_ENTITY_NAME);
        assertThat(testZEntity.getEntityAbbre()).isEqualTo(DEFAULT_ENTITY_ABBRE);
        assertThat(testZEntity.getEntityStdName()).isEqualTo(DEFAULT_ENTITY_STD_NAME);
        assertThat(testZEntity.getEntityType()).isEqualTo(DEFAULT_ENTITY_TYPE);
        assertThat(testZEntity.getIsGuiKou()).isEqualTo(DEFAULT_IS_GUI_KOU);
    }

    @Test
    @Transactional
    public void createZEntityWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zEntityRepository.findAll().size();

        // Create the ZEntity with an existing ID
        zEntity.setId(1L);
        ZEntityDTO zEntityDTO = zEntityMapper.toDto(zEntity);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZEntityMockMvc.perform(post("/api/z-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ZEntity in the database
        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkEntityNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = zEntityRepository.findAll().size();
        // set the field null
        zEntity.setEntityName(null);

        // Create the ZEntity, which fails.
        ZEntityDTO zEntityDTO = zEntityMapper.toDto(zEntity);

        restZEntityMockMvc.perform(post("/api/z-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zEntityDTO)))
            .andExpect(status().isBadRequest());

        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllZEntities() throws Exception {
        // Initialize the database
        zEntityRepository.saveAndFlush(zEntity);

        // Get all the zEntityList
        restZEntityMockMvc.perform(get("/api/z-entities?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zEntity.getId().intValue())))
            .andExpect(jsonPath("$.[*].entityName").value(hasItem(DEFAULT_ENTITY_NAME.toString())))
            .andExpect(jsonPath("$.[*].entityAbbre").value(hasItem(DEFAULT_ENTITY_ABBRE.toString())))
            .andExpect(jsonPath("$.[*].entityStdName").value(hasItem(DEFAULT_ENTITY_STD_NAME.toString())))
            .andExpect(jsonPath("$.[*].entityType").value(hasItem(DEFAULT_ENTITY_TYPE)))
            .andExpect(jsonPath("$.[*].isGuiKou").value(hasItem(DEFAULT_IS_GUI_KOU)));
    }
    
    @Test
    @Transactional
    public void getZEntity() throws Exception {
        // Initialize the database
        zEntityRepository.saveAndFlush(zEntity);

        // Get the zEntity
        restZEntityMockMvc.perform(get("/api/z-entities/{id}", zEntity.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zEntity.getId().intValue()))
            .andExpect(jsonPath("$.entityName").value(DEFAULT_ENTITY_NAME.toString()))
            .andExpect(jsonPath("$.entityAbbre").value(DEFAULT_ENTITY_ABBRE.toString()))
            .andExpect(jsonPath("$.entityStdName").value(DEFAULT_ENTITY_STD_NAME.toString()))
            .andExpect(jsonPath("$.entityType").value(DEFAULT_ENTITY_TYPE))
            .andExpect(jsonPath("$.isGuiKou").value(DEFAULT_IS_GUI_KOU));
    }

    @Test
    @Transactional
    public void getNonExistingZEntity() throws Exception {
        // Get the zEntity
        restZEntityMockMvc.perform(get("/api/z-entities/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZEntity() throws Exception {
        // Initialize the database
        zEntityRepository.saveAndFlush(zEntity);

        int databaseSizeBeforeUpdate = zEntityRepository.findAll().size();

        // Update the zEntity
        ZEntity updatedZEntity = zEntityRepository.findById(zEntity.getId()).get();
        // Disconnect from session so that the updates on updatedZEntity are not directly saved in db
        em.detach(updatedZEntity);
        updatedZEntity
            .entityName(UPDATED_ENTITY_NAME)
            .entityAbbre(UPDATED_ENTITY_ABBRE)
            .entityStdName(UPDATED_ENTITY_STD_NAME)
            .entityType(UPDATED_ENTITY_TYPE)
            .isGuiKou(UPDATED_IS_GUI_KOU);
        ZEntityDTO zEntityDTO = zEntityMapper.toDto(updatedZEntity);

        restZEntityMockMvc.perform(put("/api/z-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zEntityDTO)))
            .andExpect(status().isOk());

        // Validate the ZEntity in the database
        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeUpdate);
        ZEntity testZEntity = zEntityList.get(zEntityList.size() - 1);
        assertThat(testZEntity.getEntityName()).isEqualTo(UPDATED_ENTITY_NAME);
        assertThat(testZEntity.getEntityAbbre()).isEqualTo(UPDATED_ENTITY_ABBRE);
        assertThat(testZEntity.getEntityStdName()).isEqualTo(UPDATED_ENTITY_STD_NAME);
        assertThat(testZEntity.getEntityType()).isEqualTo(UPDATED_ENTITY_TYPE);
        assertThat(testZEntity.getIsGuiKou()).isEqualTo(UPDATED_IS_GUI_KOU);
    }

    @Test
    @Transactional
    public void updateNonExistingZEntity() throws Exception {
        int databaseSizeBeforeUpdate = zEntityRepository.findAll().size();

        // Create the ZEntity
        ZEntityDTO zEntityDTO = zEntityMapper.toDto(zEntity);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZEntityMockMvc.perform(put("/api/z-entities")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zEntityDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ZEntity in the database
        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZEntity() throws Exception {
        // Initialize the database
        zEntityRepository.saveAndFlush(zEntity);

        int databaseSizeBeforeDelete = zEntityRepository.findAll().size();

        // Get the zEntity
        restZEntityMockMvc.perform(delete("/api/z-entities/{id}", zEntity.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ZEntity> zEntityList = zEntityRepository.findAll();
        assertThat(zEntityList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZEntity.class);
        ZEntity zEntity1 = new ZEntity();
        zEntity1.setId(1L);
        ZEntity zEntity2 = new ZEntity();
        zEntity2.setId(zEntity1.getId());
        assertThat(zEntity1).isEqualTo(zEntity2);
        zEntity2.setId(2L);
        assertThat(zEntity1).isNotEqualTo(zEntity2);
        zEntity1.setId(null);
        assertThat(zEntity1).isNotEqualTo(zEntity2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZEntityDTO.class);
        ZEntityDTO zEntityDTO1 = new ZEntityDTO();
        zEntityDTO1.setId(1L);
        ZEntityDTO zEntityDTO2 = new ZEntityDTO();
        assertThat(zEntityDTO1).isNotEqualTo(zEntityDTO2);
        zEntityDTO2.setId(zEntityDTO1.getId());
        assertThat(zEntityDTO1).isEqualTo(zEntityDTO2);
        zEntityDTO2.setId(2L);
        assertThat(zEntityDTO1).isNotEqualTo(zEntityDTO2);
        zEntityDTO1.setId(null);
        assertThat(zEntityDTO1).isNotEqualTo(zEntityDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(zEntityMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(zEntityMapper.fromId(null)).isNull();
    }
}
