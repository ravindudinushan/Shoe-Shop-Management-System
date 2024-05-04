package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoes.enums.Gender;
import lk.ijse.helloShoes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    private String employeeCode;
    private String employeeName;
    @Column(columnDefinition = "LONGTEXT")
    private String profilePic;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String status;
    private String designation;
    @Enumerated(EnumType.STRING)
    private Role role;
    private Date dob;
    private Date dateOfJoin;
    private String branch;
    private String  address1;
    private String  address2;
    private String  address3;
    private String  address4;
    private String  address5;
    private String contact;
    private String email;
    private String emergencyPerson;
    private String emergencyContact;
}
