package com.gogo.jhidemo.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

import com.gogo.jhidemo.domain.enumeration.Zenumer;

/**
 * A ZVersion.
 */
@Entity
@Table(name = "zversion")
public class ZVersion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "version_type")
    private Integer versionType;

    @Column(name = "access_type")
    private Integer accessType;

    @Column(name = "in_use")
    private Integer inUse;

    @Column(name = "date_in_use")
    private LocalDate dateInUse;

    @Enumerated(EnumType.STRING)
    @Column(name = "access_type_1")
    private Zenumer accessType1;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getVersionType() {
        return versionType;
    }

    public ZVersion versionType(Integer versionType) {
        this.versionType = versionType;
        return this;
    }

    public void setVersionType(Integer versionType) {
        this.versionType = versionType;
    }

    public Integer getAccessType() {
        return accessType;
    }

    public ZVersion accessType(Integer accessType) {
        this.accessType = accessType;
        return this;
    }

    public void setAccessType(Integer accessType) {
        this.accessType = accessType;
    }

    public Integer getInUse() {
        return inUse;
    }

    public ZVersion inUse(Integer inUse) {
        this.inUse = inUse;
        return this;
    }

    public void setInUse(Integer inUse) {
        this.inUse = inUse;
    }

    public LocalDate getDateInUse() {
        return dateInUse;
    }

    public ZVersion dateInUse(LocalDate dateInUse) {
        this.dateInUse = dateInUse;
        return this;
    }

    public void setDateInUse(LocalDate dateInUse) {
        this.dateInUse = dateInUse;
    }

    public Zenumer getAccessType1() {
        return accessType1;
    }

    public ZVersion accessType1(Zenumer accessType1) {
        this.accessType1 = accessType1;
        return this;
    }

    public void setAccessType1(Zenumer accessType1) {
        this.accessType1 = accessType1;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        ZVersion zVersion = (ZVersion) o;
        if (zVersion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zVersion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ZVersion{" +
            "id=" + getId() +
            ", versionType=" + getVersionType() +
            ", accessType=" + getAccessType() +
            ", inUse=" + getInUse() +
            ", dateInUse='" + getDateInUse() + "'" +
            ", accessType1='" + getAccessType1() + "'" +
            "}";
    }
}
