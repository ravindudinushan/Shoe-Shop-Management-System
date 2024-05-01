package lk.ijse.helloShoes.entity;

import jakarta.persistence.*;
import lk.ijse.helloShoes.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Sale {
    @Id
    private String orderNo;
    @ManyToOne(cascade = {CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "customerCode", referencedColumnName = "customerCode", nullable = false)
    private Customer customerId;
    private double totalPrice;
    private Timestamp purchaseDate;
    @Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    private double addPoints;
    private String cashierName;
    @OneToMany(mappedBy = "sale", cascade = CascadeType.ALL)
    private List<SaleDetails> saleDetails;
}
