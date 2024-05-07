package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@IdClass(SupplierDetails_PK.class)
public class SupplierDetails {
    @Id
    private String supplierCode;
    @Id
    private String itemCode;

    @ManyToOne
    @JoinColumn(name = "supplierCode",referencedColumnName = "supplierCode",insertable = false,updatable = false)
    private Supplier supplier;

    //Out-verse
    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "itemCode",insertable = false,updatable = false)
    private Inventory inventory;
}
