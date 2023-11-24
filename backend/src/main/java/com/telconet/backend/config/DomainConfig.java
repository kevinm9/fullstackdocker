package com.telconet.backend.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@EntityScan("com.telconet.backend.domain")
@EnableJpaRepositories("com.telconet.backend.repos")
@EnableTransactionManagement
public class DomainConfig {
}
