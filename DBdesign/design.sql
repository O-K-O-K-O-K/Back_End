

CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `dog_count` varchar(50) DEFAULT NULL,
  `wish_desc` text NOT NULL,
  `completed` tinyint NOT NULL,
  `location_id` int NOT NULL,
  `user_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_c


CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_nickname` varchar(45) NOT NULL,
  `user_gender` tinyint(1) NOT NULL,
  `user_age` varchar(45) NOT NULL,
  `user_image` text NOT NULL,
  `dog_id` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`),
  KEY `dog_id` (`dog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_category` varchar(45) NOT NULL,
  `longtitude` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `locationAddress` varchar(100) NOT NULL,
  `post_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `post_id` (`post_id`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci