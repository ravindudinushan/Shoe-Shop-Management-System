package lk.ijse.helloShoes.dto;

import lk.ijse.helloShoes.embeded.Address;
import lk.ijse.helloShoes.enums.Gender;
import lk.ijse.helloShoes.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String employeeCode;
    private String employeeName;
    private String profilePic;
    private Gender gender;
    private String status;
    private String designation;
    private Role role;
    private Date dob;
    private Date dateOfJoin;
    private String branch;
    private Address address;
    private String contact;
    private String email;
    private String emergencyPerson;
    private String emergencyContact;
}
