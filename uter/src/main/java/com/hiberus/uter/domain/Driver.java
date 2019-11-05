package com.hiberus.uter.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Driver.
 */
@Entity
@Table(name = "driver")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Driver implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @NotNull
    @Column(name = "sur_name", nullable = false)
    private String surName;

    @NotNull
    @Column(name = "license", nullable = false)
    private String license;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Driver name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurName() {
        return surName;
    }

    public Driver surName(String surName) {
        this.surName = surName;
        return this;
    }

    public void setSurName(String surName) {
        this.surName = surName;
    }

    public String getLicense() {
        return license;
    }

    public Driver license(String license) {
        this.license = license;
        return this;
    }

    public void setLicense(String license) {
        this.license = license;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Driver)) {
            return false;
        }
        return id != null && id.equals(((Driver) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Driver{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", surName='" + getSurName() + "'" +
            ", license='" + getLicense() + "'" +
            "}";
    }
}
