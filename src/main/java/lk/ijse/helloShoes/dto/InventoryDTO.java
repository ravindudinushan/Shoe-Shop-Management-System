package lk.ijse.helloShoes.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lk.ijse.helloShoes.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InventoryDTO {
    private String itemCode;
    @NotBlank(message = "Item Description can not be null")
    @Pattern(regexp = "[A-Za-z ]+", message = "Item Description is not valid")
    private String itemDesc;
    private String  itemPic;
    @NotBlank(message = "Category can not be null")
    private String category;
    @NotBlank(message = "Size can not be null")
    private int size;
    @Positive(message = "Unit price must be a positive value")
    private double unitPriceBuy;
    @Positive(message = "Unit price must be a positive value")
    private double unitPriceSale;
    private int quantity;
    @NotBlank(message = "Status can not be null")
    private Status status;
}
