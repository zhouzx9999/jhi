package com.gogo.jhidemo.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A ZEntity.
 */
@Entity
@Table(name = "zentity")
public class ZEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "entity_name", nullable = false)
    private String entityName;

    @Column(name = "entity_abbre")
    private String entityAbbre;

    @Column(name = "entity_std_name")
    private String entityStdName;

    @Column(name = "entity_type")
    private Integer entityType;

    @Column(name = "is_gui_kou")
    private Integer isGuiKou;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User creater;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityName() {
        return entityName;
    }

    public ZEntity entityName(String entityName) {
        this.entityName = entityName;
        return this;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityAbbre() {
        return entityAbbre;
    }

    public ZEntity entityAbbre(String entityAbbre) {
        this.entityAbbre = entityAbbre;
        return this;
    }

    public void setEntityAbbre(String entityAbbre) {
        this.entityAbbre = entityAbbre;
    }

    public String getEntityStdName() {
        return entityStdName;
    }

    public ZEntity entityStdName(String entityStdName) {
        this.entityStdName = entityStdName;
        return this;
    }

    public void setEntityStdName(String entityStdName) {
        this.entityStdName = entityStdName;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public ZEntity entityType(Integer entityType) {
        this.entityType = entityType;
        return this;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }

    public Integer getIsGuiKou() {
        return isGuiKou;
    }

    public ZEntity isGuiKou(Integer isGuiKou) {
        this.isGuiKou = isGuiKou;
        return this;
    }

    public void setIsGuiKou(Integer isGuiKou) {
        this.isGuiKou = isGuiKou;
    }

    public User getCreater() {
        return creater;
    }

    public ZEntity creater(User user) {
        this.creater = user;
        return this;
    }

    public void setCreater(User user) {
        this.creater = user;
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
        ZEntity zEntity = (ZEntity) o;
        if (zEntity.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zEntity.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ZEntity{" +
            "id=" + getId() +
            ", entityName='" + getEntityName() + "'" +
            ", entityAbbre='" + getEntityAbbre() + "'" +
            ", entityStdName='" + getEntityStdName() + "'" +
            ", entityType=" + getEntityType() +
            ", isGuiKou=" + getIsGuiKou() +
            "}";
    }
}
