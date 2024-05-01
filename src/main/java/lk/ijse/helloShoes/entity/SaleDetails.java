package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@IdClass(SaleDetails_PK.class)
public class SaleDetails {
    @Id
    private String orderNo;
    @Id
    private String itemCode;
    private double unitPriceSale;
    private int quantity;
    //Out-Verse
    @ManyToOne
    @JoinColumn(name = "orderNo",referencedColumnName = "orderNo",insertable = false,updatable = false)
    private Sale sale;

    //Out-verse
    @ManyToOne
    @JoinColumn(name = "itemCode",referencedColumnName = "itemCode",insertable = false,updatable = false)
    private Inventory inventory;
}
