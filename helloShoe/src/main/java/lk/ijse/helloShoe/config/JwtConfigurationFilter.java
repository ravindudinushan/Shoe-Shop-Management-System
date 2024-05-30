package lk.ijse.helloShoe.config;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lk.ijse.helloShoe.service.JWTService;
import lk.ijse.helloShoe.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Configuration
@RequiredArgsConstructor
public class JwtConfigurationFilter extends OncePerRequestFilter{
    private final JWTService jwtService;
    private final UserService userService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader("Authorization"); // get the value of the Authorization header

        // validate Authorization header
        if(authorizationHeader != null && authorizationHeader.startsWith("Bearer ")){
            String jwt = authorizationHeader.substring(7); // extract the JWT token from the Authorization header
            String extractedUserName = jwtService.extractUserName(jwt); //extract the username from the JWT

            // check if username extracted from JWT is not null and there is no existing authenticated user in the security context
            if(extractedUserName != null && SecurityContextHolder.getContext().getAuthentication()==null){
                UserDetails userDetails = userService.userDetailService().loadUserByUsername(extractedUserName); //get the UserDetails corresponding to the extracted username from user table in db

                // checks if the JWT token is valid for the extracted user details
                if(jwtService.isTokenValid(jwt,userDetails)){
                    // create auth token and sets it in the security context indicating that the user represented by the token is authenticated
                    UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                    authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authToken);

                    System.out.println(userDetails.getAuthorities());
                    if (!userDetails.getAuthorities().contains(new SimpleGrantedAuthority("Role_ADMIN"))) {
                        // Print the request
                        System.out.println("Request received from non-ADMIN user: " + request.getMethod() + " " + request.getRequestURI());

                        if(request.getMethod().equals("GET")){
                            System.out.println("Getting...");
                        }else if(request.getMethod().equals("POST") & request.getRequestURI().equals("/app/api/v1/sale")){
                            System.out.println("Processing...");
                        }else{
                            /*response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                            response.setContentType("application/json");
                            String message = "{\"error\": \"You haven't Authorization to execute this process\"}";
                            response.getWriter().write(message);
                            return;*/
                        }
                    }
                }
            }
        }

        filterChain.doFilter(request,response);
    }
}
