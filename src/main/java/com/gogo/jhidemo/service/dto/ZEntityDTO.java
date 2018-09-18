package com.gogo.jhidemo.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the ZEntity entity.
 */
public class ZEntityDTO implements Serializable {

    private Long id;

    @NotNull
    private String entityName;

    private String entityAbbre;

    private String entityStdName;

    private Integer entityType;

    private Integer isGuiKou;

    private Long createrId;

    private String createrLogin;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public String getEntityAbbre() {
        return entityAbbre;
    }

    public void setEntityAbbre(String entityAbbre) {
        this.entityAbbre = entityAbbre;
    }

    public String getEntityStdName() {
        return entityStdName;
    }

    public void setEntityStdName(String entityStdName) {
        this.entityStdName = entityStdName;
    }

    public Integer getEntityType() {
        return entityType;
    }

    public void setEntityType(Integer entityType) {
        this.entityType = entityType;
    }

    public Integer getIsGuiKou() {
        return isGuiKou;
    }

    public void setIsGuiKou(Integer isGuiKou) {
        this.isGuiKou = isGuiKou;
    }

    public Long getCreaterId() {
        return createrId;
    }

    public void setCreaterId(Long userId) {
        this.createrId = userId;
    }

    public String getCreaterLogin() {
        return createrLogin;
    }

    public void setCreaterLogin(String userLogin) {
        this.createrLogin = userLogin;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ZEntityDTO zEntityDTO = (ZEntityDTO) o;
        if (zEntityDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), zEntityDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ZEntityDTO{" +
            "id=" + getId() +
            ", entityName='" + getEntityName() + "'" +
            ", entityAbbre='" + getEntityAbbre() + "'" +
            ", entityStdName='" + getEntityStdName() + "'" +
            ", entityType=" + getEntityType() +
            ", isGuiKou=" + getIsGuiKou() +
            ", creater=" + getCreaterId() +
            ", creater='" + getCreaterLogin() + "'" +
            "}";
    }
}
