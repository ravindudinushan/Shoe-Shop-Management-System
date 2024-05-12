package lk.ijse.helloShoe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDetailsDTO{
    private String supplierCode;
    private String itemCode;
}