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
  `meetingDate` varchar(100) NOT NULL,
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
  `coordinate` JSON NOT NULL,
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


  create table `category`(
  `categoryId` INT NOT NULL,
  `dogId` INT NOT NULL,
  `userId` INT NOT NULL,
  `postId` INT NOT NULL,
  PRIMARY KEY(`categoryId`),
  KEY `categoryId` (`categoryId`),
  FOREIGN KEY (`dogId`) REFERENCES `dog` (`dogId`) ON UPDATE CASCADE
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
  FOREIGN KEY (`postId`) REFERENCES `post` (`postId`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci