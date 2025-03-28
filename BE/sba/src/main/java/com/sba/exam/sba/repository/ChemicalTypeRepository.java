package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.ChemicalType;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ChemicalTypeRepository extends JpaRepository<ChemicalType, Integer> {
    List<ChemicalType> findByIsDeleted(boolean isDeleted);

}
