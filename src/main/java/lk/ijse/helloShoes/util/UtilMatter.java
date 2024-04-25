package lk.ijse.helloShoes.util;

import java.util.UUID;

public class UtilMatter {
    public static String generateId(){
        return UUID.randomUUID().toString();
    }
}
