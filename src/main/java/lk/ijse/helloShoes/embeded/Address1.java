package lk.ijse.helloShoes.embeded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Address1 {
    String Address1;
    String Address2;
    String Address3;
    String Address4;
    String Address5;
}
