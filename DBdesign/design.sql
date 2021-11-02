-- //dog 부모
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_nickname` varchar(45) NOT NULL,
  `user_gender` tinyint(1) NOT NULL,
  `user_age` varchar(45) NOT NULL,
  `user_image` text NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--  //자식 (user가 부모)
-- create table `dog`(
--   `dog_id` INT NOT NULL AUTO_INCREMENT,
--   `dog_gender` VARCHAR(45) NOT NULL,
--   `dog_name` VARCHAR(45) NOT NULL,
--   `dog_size` VARCHAR(45) NOT NULL,
--   `dog_breed` VARCHAR(45) NOT NULL,
--   `dog_age` VARCHAR(45) NOT NULL,
--   `neutral` TINYINT NOT NULL, 
--   `dog_comment` VARCHAR(100) NOT NULL,
--   `dog_image` TEXT NOT NULL,
--   `user_id` INT NOT NULL,
--   PRIMARY KEY(`dog_id`),
--   KEY `dog_id` (`dog_id`),
--   KEY `user_id` (`user_id`),
--   FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE 
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

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
  KEY `dog_id` (`dog_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- 자식
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `meeting_date` varchar(50) NOT NULL,
  `meeting_time` varchar(50) NOT NULL,
  `dog_count` varchar(50) NOT NULL,
  `wish_desc` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` tinyint NOT NULL,
  `location_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`post_id`),
  KEY `user_id` (`user_id`),
  KEY `post_id` (`post_id`),
  Key `location_id` (`location_id`),
  FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE, 
  FOREIGN KEY (`location_id`) REFERENCES `location` (`location_id`) ON UPDATE CASCADE
  )
  ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


-- 부모

CREATE TABLE `location` (
  `location_id` int NOT NULL AUTO_INCREMENT,
  `location_category` varchar(45) NOT NULL,
  `longitude` varchar(45) NOT NULL,
  `latitude` varchar(45) NOT NULL,
  `location_address` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`location_id`),
  KEY `location_id` (`location_id`)
  ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci



