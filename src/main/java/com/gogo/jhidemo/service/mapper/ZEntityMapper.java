package com.gogo.jhidemo.service.mapper;

import com.gogo.jhidemo.domain.*;
import com.gogo.jhidemo.service.dto.ZEntityDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ZEntity and its DTO ZEntityDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface ZEntityMapper extends EntityMapper<ZEntityDTO, ZEntity> {

    @Mapping(source = "creater.id", target = "createrId")
    @Mapping(source = "creater.login", target = "createrLogin")
    ZEntityDTO toDto(ZEntity zEntity);

    @Mapping(source = "createrId", target = "creater")
    ZEntity toEntity(ZEntityDTO zEntityDTO);

    default ZEntity fromId(Long id) {
        if (id == null) {
            return null;
        }
        ZEntity zEntity = new ZEntity();
        zEntity.setId(id);
        return zEntity;
    }
}
