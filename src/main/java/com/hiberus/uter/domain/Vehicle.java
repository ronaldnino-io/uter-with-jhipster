package com.hiberus.uter.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Vehicle.
 */
@Entity
@Table(name = "vehicle")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Vehicle implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "brand", nullable = false)
    private String brand;

    @NotNull
    @Column(name = "model", nullable = false)
    private String model;

    @NotNull
    @Column(name = "plate", nullable = false)
    private String plate;

    @NotNull
    @Column(name = "license_required", nullable = false)
    private String licenseRequired;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public Vehicle brand(String brand) {
        this.brand = brand;
        return this;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getModel() {
        return model;
    }

    public Vehicle model(String model) {
        this.model = model;
        return this;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getPlate() {
        return plate;
    }

    public Vehicle plate(String plate) {
        this.plate = plate;
        return this;
    }

    public void setPlate(String plate) {
        this.plate = plate;
    }

    public String getLicenseRequired() {
        return licenseRequired;
    }

    public Vehicle licenseRequired(String licenseRequired) {
        this.licenseRequired = licenseRequired;
        return this;
    }

    public void setLicenseRequired(String licenseRequired) {
        this.licenseRequired = licenseRequired;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Vehicle)) {
            return false;
        }
        return id != null && id.equals(((Vehicle) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Vehicle{" +
            "id=" + getId() +
            ", brand='" + getBrand() + "'" +
            ", model='" + getModel() + "'" +
            ", plate='" + getPlate() + "'" +
            ", licenseRequired='" + getLicenseRequired() + "'" +
            "}";
    }
}
