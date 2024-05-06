package lk.ijse.helloShoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
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
    @Null(message = "ID is auto generated")
    private String supplierCode;
    @NotBlank(message = "Name can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Name is not valid")
    private String supplierName;
    @NotBlank(message = "Category can not be null")
    private Category category;
    @NotBlank(message = "Address can not be null")
    private Address address;
    @NotBlank(message = "Contact can not be null")
    @Pattern(regexp = "^(?:\\+?94|0)(?:[1-9]\\d{1}|(?:2[0-4]|3[0-5]|4[0-6]|[5-7][0-5]|77|81|91)(?!\\d{2}))\\d{6}$", message = "Invalid contact number")
    private Contact contact;
    @NotBlank(message = "Email can not be null")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email not valid")
    private String email;
}
