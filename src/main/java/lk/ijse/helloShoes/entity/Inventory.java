package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoes.enums.Status;
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
    private double unitPrice;
    private int quantity;
    @Enumerated(EnumType.STRING)
    private Status status;
}
