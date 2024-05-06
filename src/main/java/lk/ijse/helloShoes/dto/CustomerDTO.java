package lk.ijse.helloShoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.enums.Gender;
import lk.ijse.helloShoes.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    @Null(message = "ID is auto generated")
    private String customerCode;
    @NotBlank(message = "Name can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Name is not valid")
    private String customerName;
    @NotBlank(message = "Gender can not be null")
    private Gender gender;
    private Date date;
    @NotBlank(message = "Level can not be null")
    private Level level;
    private int points;
    private Date dob;
    @NotBlank(message = "Address can not be null")
    private Address address;
    private String contact;
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email not valid")
    private String email;
}
