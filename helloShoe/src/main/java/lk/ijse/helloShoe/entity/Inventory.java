package lk.ijse.helloShoe.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoe.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Inventory {
    @Id
    private String itemCode;
    private String itemDesc;
    @Column(columnDefinition = "LONGTEXT")
    private String  itemPic;
    private String category;
    private int size;
    private String supplierCode;
    private String supplierName;
    private double unitPriceBuy;
    private double unitPriceSale;
    private int quantity;
    private double profit;
    private double profitMargin;
    @Enumerated(EnumType.STRING)
    private Status status;
}
