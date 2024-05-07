package lk.ijse.helloShoes.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDetails_PK implements Serializable {
    private String supplierCode;
    private String itemCode;
}
