package lk.ijse.helloShoes.dto;

import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.enums.Gender;
import lk.ijse.helloShoes.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String customerCode;
    private String customerName;
    private Gender gender;
    private LocalDate date;
    private Level level;
    private int points;
    private Date dob;
    private Address address;
    private String contact;
    private String email;
}
