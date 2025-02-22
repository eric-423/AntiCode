package com.sba.exam.sba.repository;

import com.sba.exam.sba.entity.ChemicalType;
import org.hibernate.sql.ast.tree.expression.JdbcParameter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChemicalTypeRepository extends JpaRepository<ChemicalType, Integer> {
    
}
