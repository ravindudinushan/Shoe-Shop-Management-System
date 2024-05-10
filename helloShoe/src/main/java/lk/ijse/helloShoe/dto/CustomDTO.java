package lk.ijse.helloShoe.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomDTO {
    private String value;
    private int count;

    public CustomDTO(String lastIndex) {
        this.value=lastIndex;
    }

    public CustomDTO(int count) {
        this.count=count;
    }
}

