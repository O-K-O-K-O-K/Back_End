CREATE TABLE `user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `userEmail` VARCHAR(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userNickname` VARCHAR(45) NOT NULL,
  `userGender` VARCHAR(45) NOT NULL,
  `userAge` VARCHAR(45) NOT NULL,
  `userImage` TEXT NOT NULL,
  `userLocation` varchar(45) NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `userId` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

create table `dog`(
  `dogId` INT NOT NULL AUTO_INCREMENT,
  `dogGender` VARCHAR(45) NOT NULL,
  `dogName` VARCHAR(45) NOT NULL,
  `dogSize` VARCHAR(45) NOT NULL,
  `dogBreed` VARCHAR(45) NOT NULL,
  `dogAge` VARCHAR(45) NOT NULL,
  `neutral` VARCHAR(45) NOT NULL, 
  `dogComment` VARCHAR(100) NOT NULL,
  `dogImage` TEXT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY(`dogId`),
  KEY `dogId` (`dogId`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

CREATE TABLE `post` (
  `postId` INT NOT NULL AUTO_INCREMENT,
  `meetingDate` varchar(50) NOT NULL,
  `wishDesc` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` tinyint NOT NULL,
  `locationCategory` varchar(45) NOT NULL,
  `startLongitude` varchar(45) NOT NULL,
  `startLatitude` varchar(45) NOT NULL,
  `startLocationAddress` varchar(100) NOT NULL,
  `endLongitude` varchar(45) NOT NULL,
  `endLatitude` varchar(45) NOT NULL,
  `endLocationAddress` varchar(100) NOT NULL,
  `totalDistance` varchar(45) NOT NULL,
  `dogCount` INT NOT NULL,
  `startTime` VARCHAR(45) NOT NULL,
  `endTime` VARCHAR(45) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
  )
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


  CREATE TABLE `dogSta` (
  `dogPostId` INT NOT NULL AUTO_INCREMENT,
  `dogPostImage` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dogPostDesc` VARCHAR(45) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`dogPostId`),
  KEY `dogPostId` (`dogPostId`),
  KEY `userId` (`userId`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
  )
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


--   CREATE TABLE `kakaoUser` (
--   `kakaoUserId` INT NOT NULL AUTO_INCREMENT,
--   `userEmail` VARCHAR(45) NOT NULL,
--   `password` varchar(255) NOT NULL,
--   `userNickname` VARCHAR(45) NOT NULL,
--   `userGender` VARCHAR(45) NOT NULL,
--   `userAge` VARCHAR(45) NOT NULL,
--   `userImage` TEXT NOT NULL,
--   `userLocation` varchar(45) NOT NULL,
--   PRIMARY KEY (`userId`),
--   KEY `userId` (`userId`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


CREATE TABLE `chat` (
  `chatId` int(11) NOT NULL,
  `userId` INT NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`chatId`),
  KEY `chatId` (`chatId`),
  FOREIGN KEY (`user.Id`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `conversation` (
  `conversationId` int(11) NOT NULL,
  `userId` INT NOT NULL,
  `theotherId`INT NOT NULL,
  PRIMARY KEY(`conversationId`),
  KEY `conversationId` (`conversationId`),
  FOREIGN KEY (`user.Id`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;