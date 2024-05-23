package lk.ijse.helloShoe.dto;

import jakarta.validation.constraints.*;
import lk.ijse.helloShoe.enums.Gender;
import lk.ijse.helloShoe.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    @Null(message = "ID is auto generated")
    private String employeeCode;
    @NotBlank(message = "Name can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Name is not valid")
    private String employeeName;
    private String employeeProfilePic;
    @NotBlank(message = "Gender can not be null")
    private Gender gender;
    @NotBlank(message = "Status can not be null")
    private String status;
    @NotBlank(message = "Designation can not be null")
    private String designation;
    @NotBlank(message = "Role can not be null")
    private Role accessRole;
    @NotBlank(message = "Date of Birth can not be null")
    @Past(message = "Date of Birth must be in the past")
    private Date dob;
    @NotBlank(message = "Date of join can not be null")
    private Date dateOfJoin;
    @NotBlank(message = "Name can not be null")
    private String attachedBranch;
    @NotBlank(message = "Address can not be null")
    private String  addressLine01;
    @NotBlank(message = "Address can not be null")
    private String  addressLine02;
    @NotBlank(message = "Address can not be null")
    private String  addressLine03;
    @NotBlank(message = "Address can not be null")
    private String  addressLine04;
    @NotBlank(message = "Address can not be null")
    private String  addressLine05;
    @NotBlank(message = "Contact can not be null")
    @Pattern(regexp = "^(?:\\+?94|0)(?:[1-9]\\d{1}|(?:2[0-4]|3[0-5]|4[0-6]|[5-7][0-5]|77|81|91)(?!\\d{2}))\\d{6}$", message = "Invalid contact number")
    private String contactNo;
    @NotBlank(message = "Email can not be null")
    @Pattern(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email not valid")
    private String email;
    @NotBlank(message = "Contact can not be null")
    @Pattern(regexp = "^(?:\\+?94|0)(?:[1-9]\\d{1}|(?:2[0-4]|3[0-5]|4[0-6]|[5-7][0-5]|77|81|91)(?!\\d{2}))\\d{6}$", message = "Invalid contact number")
    private String emergencyContact;
    @NotBlank(message = "Name can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Name is not valid")
    private String emergencyContactPerson;
}
