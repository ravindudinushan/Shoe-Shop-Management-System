package lk.ijse.helloShoes.dto;

import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.embeded.Contact;
import lk.ijse.helloShoes.enums.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private String supplierCode;
    private String supplierName;
    private Category category;
    private Address address;
    private Contact contact;
    private String email;
}
