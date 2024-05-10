package lk.ijse.helloShoe.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaleDetails_PK implements Serializable {
    private String orderNo;
    private String itemCode;
}
