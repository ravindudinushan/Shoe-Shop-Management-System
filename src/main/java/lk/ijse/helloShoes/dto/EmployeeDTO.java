package lk.ijse.helloShoes.dto;

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

}
