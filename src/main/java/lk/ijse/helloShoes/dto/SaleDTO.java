package lk.ijse.helloShoes.dto;

import lk.ijse.helloShoes.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDTO {
    private String orderNo;
    private String customerCode;
    private double totalPrice;
    private Timestamp purchaseDate;
    private PaymentMethod paymentMethod;
    private double addPoints;
    private String cashierName;
}
