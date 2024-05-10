package lk.ijse.helloShoe.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoe.embeded.Address;
import lk.ijse.helloShoe.embeded.Contact;
import lk.ijse.helloShoe.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Supplier {
    @Id
    private String supplierCode;
    private String supplierName;
    @Enumerated(EnumType.STRING)
    private Category category;
    @Embedded
    private Address address;
    @Embedded
    private Contact contact;
    private String email;
//    @OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL)
//    private List<SupplierDetails> saleDetails;
}
