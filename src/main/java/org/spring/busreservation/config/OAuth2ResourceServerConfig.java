package org.spring.busreservation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;
import org.springframework.security.oauth2.provider.error.OAuth2AccessDeniedHandler;

@Configuration
@EnableResourceServer
public class OAuth2ResourceServerConfig extends ResourceServerConfigurerAdapter {
    private static final String RESOURCE_ID = "bus_reservation_rest_api";

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.resourceId(RESOURCE_ID).stateless(false);
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
                .requestMatchers().antMatchers("/api/**")
                .and().authorizeRequests()
                .antMatchers("/api/users/register").permitAll()
                .antMatchers("/api/captcha").permitAll()
                .antMatchers("/api/users/confirm").permitAll()
                .antMatchers(HttpMethod.GET, "/api/connections").permitAll()
                .antMatchers(HttpMethod.GET, "/api/pricetable").permitAll()
                .antMatchers("/api/ticket-pdf/**").permitAll()
                .anyRequest().fullyAuthenticated()
                .antMatchers("/api/**").access("hasRole('USER')")
                .antMatchers("/api/admin/**").access("hasRole('ADMIN')")
                .and().exceptionHandling().accessDeniedHandler(new OAuth2AccessDeniedHandler());
    }
}
