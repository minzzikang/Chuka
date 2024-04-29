package com.luckyseven.event.config;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoConfig {

    @Value("${mongodb.connection-string}")
    private String connectionString;

     @Bean
    MongoClient mongoClient() {
        return MongoClients.create(connectionString);
    }

    @Bean
    MongoOperations mongoTemplate(MongoClient mongoClient) {
        return new MongoTemplate(mongoClient, "rollingpaper");
    }

//    @Bean
//    public MongoDatabaseFactory mongoDatabaseFactory() {
//        return new SimpleMongoClientDatabaseFactory(connectionString);
//    }

//    @Bean
//    public MongoTemplate mongoTemplate() {
//        return new MongoTemplate(mongoDatabaseFactory());
//    }

//    @Bean
//    public MongoDatabaseFactory mongoDBFactory() {
//        return new SimpleMongoClientDatabaseFactory(connectionString);
//    }
//
//    @Bean
//    public MongoMappingContext mongoMappingContext() {
//        return new MongoMappingContext();
//    }
//
//    @Bean
//    public MongoTemplate mongoTemplate() {
//        DbRefResolver dbRefResolver = new DefaultDbRefResolver(mongoDBFactory());
//        MappingMongoConverter mongoConverter = new MappingMongoConverter(dbRefResolver, mongoMappingContext());
//        mongoConverter.setTypeMapper(new DefaultMongoTypeMapper());
//
//        return new MongoTemplate(mongoDBFactory(), mongoConverter);
//    }
}
