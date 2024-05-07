package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoes.embeded.Address1;
import lk.ijse.helloShoes.enums.Gender;
import lk.ijse.helloShoes.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    private String customerCode;
    private String customerName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private Date date;
    @Enumerated(EnumType.STRING)
    private Level level;
    private int points;
    private Date dob;
    @Embedded
    private Address1 address;
    private String contact;
    private String email;
}
