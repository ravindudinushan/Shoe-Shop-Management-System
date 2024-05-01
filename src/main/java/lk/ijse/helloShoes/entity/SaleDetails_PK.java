package lk.ijse.helloShoes.entity;

import jakarta.persistence.IdClass;
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
