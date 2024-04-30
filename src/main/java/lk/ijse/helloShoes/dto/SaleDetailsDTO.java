package lk.ijse.helloShoes.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetailsDTO {
    private String orderNo;
    private String itemCode;
    private double unitPriceSale;
    private int quantity;
}
