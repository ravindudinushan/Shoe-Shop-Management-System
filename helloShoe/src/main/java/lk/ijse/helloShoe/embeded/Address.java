package lk.ijse.helloShoe.embeded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address {
    String address1;
    String address2;
    String address3;
    String address4;
    String address5;
    String address6;
}
