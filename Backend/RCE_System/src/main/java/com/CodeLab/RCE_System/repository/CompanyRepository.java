package com.CodeLab.RCE_System.repository;

import com.CodeLab.RCE_System.entity.Company;
import com.CodeLab.RCE_System.response_dto.CompanyResponseDTO;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CompanyRepository extends JpaRepository<Company, UUID> {
    boolean existsByCompanyName(String name);

    @Query("""
                SELECT new com.CodeLab.RCE_System.response_dto.CompanyResponseDTO(
                    c.id,
                    c.companyName,
                    COUNT(p)
                )
                FROM Company c
                LEFT JOIN c.problemList p
                GROUP BY c.id, c.companyName
            """)
    List<CompanyResponseDTO> findAllCompanies(Sort sort);

    @Query("""
            SELECT c FROM Company c WHERE c.id IN(:companyList)
            """)
    Set<Company> findAllCompaniesIn(@Param("companyList") Set<UUID> companyList);

}