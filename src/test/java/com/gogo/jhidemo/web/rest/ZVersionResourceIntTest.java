package com.gogo.jhidemo.web.rest;

import com.gogo.jhidemo.JhiApp;

import com.gogo.jhidemo.domain.ZVersion;
import com.gogo.jhidemo.repository.ZVersionRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.gogo.jhidemo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.gogo.jhidemo.domain.enumeration.Zenumer;
/**
 * Test class for the ZVersionResource REST controller.
 *
 * @see ZVersionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhiApp.class)
public class ZVersionResourceIntTest {

    private static final Integer DEFAULT_VERSION_TYPE = 1;
    private static final Integer UPDATED_VERSION_TYPE = 2;

    private static final Integer DEFAULT_ACCESS_TYPE = 1;
    private static final Integer UPDATED_ACCESS_TYPE = 2;

    private static final Integer DEFAULT_IN_USE = 1;
    private static final Integer UPDATED_IN_USE = 2;

    private static final LocalDate DEFAULT_DATE_IN_USE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_IN_USE = LocalDate.now(ZoneId.systemDefault());

    private static final Zenumer DEFAULT_ACCESS_TYPE_1 = Zenumer.COST;
    private static final Zenumer UPDATED_ACCESS_TYPE_1 = Zenumer.COST;

    @Autowired
    private ZVersionRepository zVersionRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restZVersionMockMvc;

    private ZVersion zVersion;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ZVersionResource zVersionResource = new ZVersionResource(zVersionRepository);
        this.restZVersionMockMvc = MockMvcBuilders.standaloneSetup(zVersionResource)
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
    public static ZVersion createEntity(EntityManager em) {
        ZVersion zVersion = new ZVersion()
            .versionType(DEFAULT_VERSION_TYPE)
            .accessType(DEFAULT_ACCESS_TYPE)
            .inUse(DEFAULT_IN_USE)
            .dateInUse(DEFAULT_DATE_IN_USE)
            .accessType1(DEFAULT_ACCESS_TYPE_1);
        return zVersion;
    }

    @Before
    public void initTest() {
        zVersion = createEntity(em);
    }

    @Test
    @Transactional
    public void createZVersion() throws Exception {
        int databaseSizeBeforeCreate = zVersionRepository.findAll().size();

        // Create the ZVersion
        restZVersionMockMvc.perform(post("/api/z-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zVersion)))
            .andExpect(status().isCreated());

        // Validate the ZVersion in the database
        List<ZVersion> zVersionList = zVersionRepository.findAll();
        assertThat(zVersionList).hasSize(databaseSizeBeforeCreate + 1);
        ZVersion testZVersion = zVersionList.get(zVersionList.size() - 1);
        assertThat(testZVersion.getVersionType()).isEqualTo(DEFAULT_VERSION_TYPE);
        assertThat(testZVersion.getAccessType()).isEqualTo(DEFAULT_ACCESS_TYPE);
        assertThat(testZVersion.getInUse()).isEqualTo(DEFAULT_IN_USE);
        assertThat(testZVersion.getDateInUse()).isEqualTo(DEFAULT_DATE_IN_USE);
        assertThat(testZVersion.getAccessType1()).isEqualTo(DEFAULT_ACCESS_TYPE_1);
    }

    @Test
    @Transactional
    public void createZVersionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = zVersionRepository.findAll().size();

        // Create the ZVersion with an existing ID
        zVersion.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restZVersionMockMvc.perform(post("/api/z-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zVersion)))
            .andExpect(status().isBadRequest());

        // Validate the ZVersion in the database
        List<ZVersion> zVersionList = zVersionRepository.findAll();
        assertThat(zVersionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllZVersions() throws Exception {
        // Initialize the database
        zVersionRepository.saveAndFlush(zVersion);

        // Get all the zVersionList
        restZVersionMockMvc.perform(get("/api/z-versions?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(zVersion.getId().intValue())))
            .andExpect(jsonPath("$.[*].versionType").value(hasItem(DEFAULT_VERSION_TYPE)))
            .andExpect(jsonPath("$.[*].accessType").value(hasItem(DEFAULT_ACCESS_TYPE)))
            .andExpect(jsonPath("$.[*].inUse").value(hasItem(DEFAULT_IN_USE)))
            .andExpect(jsonPath("$.[*].dateInUse").value(hasItem(DEFAULT_DATE_IN_USE.toString())))
            .andExpect(jsonPath("$.[*].accessType1").value(hasItem(DEFAULT_ACCESS_TYPE_1.toString())));
    }
    
    @Test
    @Transactional
    public void getZVersion() throws Exception {
        // Initialize the database
        zVersionRepository.saveAndFlush(zVersion);

        // Get the zVersion
        restZVersionMockMvc.perform(get("/api/z-versions/{id}", zVersion.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(zVersion.getId().intValue()))
            .andExpect(jsonPath("$.versionType").value(DEFAULT_VERSION_TYPE))
            .andExpect(jsonPath("$.accessType").value(DEFAULT_ACCESS_TYPE))
            .andExpect(jsonPath("$.inUse").value(DEFAULT_IN_USE))
            .andExpect(jsonPath("$.dateInUse").value(DEFAULT_DATE_IN_USE.toString()))
            .andExpect(jsonPath("$.accessType1").value(DEFAULT_ACCESS_TYPE_1.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingZVersion() throws Exception {
        // Get the zVersion
        restZVersionMockMvc.perform(get("/api/z-versions/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateZVersion() throws Exception {
        // Initialize the database
        zVersionRepository.saveAndFlush(zVersion);

        int databaseSizeBeforeUpdate = zVersionRepository.findAll().size();

        // Update the zVersion
        ZVersion updatedZVersion = zVersionRepository.findById(zVersion.getId()).get();
        // Disconnect from session so that the updates on updatedZVersion are not directly saved in db
        em.detach(updatedZVersion);
        updatedZVersion
            .versionType(UPDATED_VERSION_TYPE)
            .accessType(UPDATED_ACCESS_TYPE)
            .inUse(UPDATED_IN_USE)
            .dateInUse(UPDATED_DATE_IN_USE)
            .accessType1(UPDATED_ACCESS_TYPE_1);

        restZVersionMockMvc.perform(put("/api/z-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedZVersion)))
            .andExpect(status().isOk());

        // Validate the ZVersion in the database
        List<ZVersion> zVersionList = zVersionRepository.findAll();
        assertThat(zVersionList).hasSize(databaseSizeBeforeUpdate);
        ZVersion testZVersion = zVersionList.get(zVersionList.size() - 1);
        assertThat(testZVersion.getVersionType()).isEqualTo(UPDATED_VERSION_TYPE);
        assertThat(testZVersion.getAccessType()).isEqualTo(UPDATED_ACCESS_TYPE);
        assertThat(testZVersion.getInUse()).isEqualTo(UPDATED_IN_USE);
        assertThat(testZVersion.getDateInUse()).isEqualTo(UPDATED_DATE_IN_USE);
        assertThat(testZVersion.getAccessType1()).isEqualTo(UPDATED_ACCESS_TYPE_1);
    }

    @Test
    @Transactional
    public void updateNonExistingZVersion() throws Exception {
        int databaseSizeBeforeUpdate = zVersionRepository.findAll().size();

        // Create the ZVersion

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restZVersionMockMvc.perform(put("/api/z-versions")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(zVersion)))
            .andExpect(status().isBadRequest());

        // Validate the ZVersion in the database
        List<ZVersion> zVersionList = zVersionRepository.findAll();
        assertThat(zVersionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteZVersion() throws Exception {
        // Initialize the database
        zVersionRepository.saveAndFlush(zVersion);

        int databaseSizeBeforeDelete = zVersionRepository.findAll().size();

        // Get the zVersion
        restZVersionMockMvc.perform(delete("/api/z-versions/{id}", zVersion.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ZVersion> zVersionList = zVersionRepository.findAll();
        assertThat(zVersionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ZVersion.class);
        ZVersion zVersion1 = new ZVersion();
        zVersion1.setId(1L);
        ZVersion zVersion2 = new ZVersion();
        zVersion2.setId(zVersion1.getId());
        assertThat(zVersion1).isEqualTo(zVersion2);
        zVersion2.setId(2L);
        assertThat(zVersion1).isNotEqualTo(zVersion2);
        zVersion1.setId(null);
        assertThat(zVersion1).isNotEqualTo(zVersion2);
    }
}
