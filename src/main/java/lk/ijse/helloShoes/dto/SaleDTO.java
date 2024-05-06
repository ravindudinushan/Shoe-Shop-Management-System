package lk.ijse.helloShoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lk.ijse.helloShoes.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {
    @Null(message = "ID is auto generated")
    private String orderNo;
    private String customerCode;
    @Positive(message = "Total price must be a positive value")
    private double totalPrice;
    @NotBlank(message = "Date can not be null")
    private Timestamp purchaseDate;
    @NotBlank(message = "Payment Method can not be null")
    private PaymentMethod paymentMethod;
    @NotBlank(message = "Points can not be null")
    private double addPoints;
    @NotBlank(message = "Name can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Name is not valid")
    private String cashierName;
}
