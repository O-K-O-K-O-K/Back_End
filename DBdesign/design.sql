CREATE TABLE `user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  `kakaoId` INT NOT NULL AUTO_INCREMENT,
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
<<<<<<< HEAD
  `meetingDate` Date NOT NULL,
=======
  `meetingDate` varchar(45) NOT NULL,
>>>>>>> 49ace4c39fdb903036655a95a725f6f131a93069
  `wishDesc` TEXT NOT NULL,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed` tinyint NOT NULL,
  `locationCategory` varchar(45) NOT NULL,
  `dogCount` INT NOT NULL,
  `startLocationAddress` varchar(100) NOT NULL,
  `endLocationAddress` varchar(45) NOT NULL,
  `totalDistance` varchar(45) NOT NULL,
  `totalTime` varchar(100) NOT NULL,
  `routeColor` varchar(45) NOT NULL,
  `routeName` varchar(45) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`postId`),
  KEY `userId` (`userId`),
  KEY `postId` (`postId`),
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
  )
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4


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


<<<<<<< HEAD
CREATE TABLE `room` (
  `roomId` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY(`roomId`),
  KEY `roomId` (`roomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chat` (
  `chatId` int(11) NOT NULL AUTO_INCREMENT,
  `roomId` int(11) NOT NULL,
  `userNickname` VARCHAR(45) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userId` INT NOT NULL,
  PRIMARY KEY(`chatId`),
  KEY `chatId` (`chatId`),
  KEY `userId` (`userId`),
  FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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


=======
CREATE TABLE `location` (
  `locationId` INT NOT NULL AUTO_INCREMENT,
  `route` JSON NOT NULL,
  PRIMARY KEY (`locationId`),
  KEY `locationId` (`locationId`)
  )
  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4
>>>>>>> 49ace4c39fdb903036655a95a725f6f131a93069
