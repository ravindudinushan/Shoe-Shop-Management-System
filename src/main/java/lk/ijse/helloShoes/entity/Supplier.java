package lk.ijse.helloShoes.entity;

import jakarta.persistence.Enumerated;
import lk.ijse.helloShoes.enums.Category;

public class Supplier {
    private String supplierCode;
    private String supplierName;
    @Enumerated
    private Category category;
}
