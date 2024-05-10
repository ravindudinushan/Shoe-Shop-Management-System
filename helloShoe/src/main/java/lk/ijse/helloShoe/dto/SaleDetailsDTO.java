package lk.ijse.helloShoe.dto;

import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetailsDTO {
    private String orderNo;
    private String itemCode;
    @Positive(message = "Unit price must be a positive value")
    private double unitPriceSale;
    @Positive(message = "Quantity must be a positive integer value")
    private int quantity;
}
