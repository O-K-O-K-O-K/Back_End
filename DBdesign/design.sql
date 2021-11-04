CREATE TABLE `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_nickname` VARCHAR(45) NOT NULL,
  `user_gender` VARCHAR(45) NOT NULL,
  `user_age` VARCHAR(45) NOT NULL,
  `user_image` TEXT,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

create table `dog`(
  `dog_id` INT NOT NULL AUTO_INCREMENT,
  `dog_gender` VARCHAR(45) NOT NULL,
  `dog_name` VARCHAR(45) NOT NULL,
  `dog_size` VARCHAR(45) NOT NULL,
  `dog_breed` VARCHAR(45) NOT NULL,
  `dog_age` VARCHAR(45) NOT NULL,
  `neutral` VARCHAR(45) NOT NULL, 
  `dog_comment` VARCHAR(100) NOT NULL,
  `dog_image` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY(`dog_id`),
  KEY `dog_id` (`dog_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `meeting_date` varchar(50) NOT NULL,
  `wish_desc` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` tinyint NOT NULL,
  `location_category` varchar(45) NOT NULL,
  `longitude` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `location_address` varchar(100) NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
  )
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
