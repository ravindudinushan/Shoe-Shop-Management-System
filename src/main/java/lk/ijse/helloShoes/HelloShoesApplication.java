package lk.ijse.helloShoes;

import jakarta.servlet.MultipartConfigElement;
import jakarta.servlet.ServletRegistration;
import org.modelmapper.ModelMapper;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class HelloShoesApplication {

	public static void main(String[] args) { SpringApplication.run(HelloShoesApplication.class, args); }

	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}

//	@Bean
//	protected void customizeRegistration(ServletRegistration.Dynamic registration) {
//		registration.setMultipartConfig(new MultipartConfigElement
//				("C:/Windows/Temp",1024*1024*10,1024*1024*20,1024*1024));
//	}
}
