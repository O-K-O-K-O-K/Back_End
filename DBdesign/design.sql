CREATE TABLE `user` (
  `userId` INT NOT NULL AUTO_INCREMENT,
  -- `kakaoId` INT NOT NULL AUTO_INCREMENT,
  `userEmail` VARCHAR(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userNickname` VARCHAR(45) NOT NULL,
  `userGender` VARCHAR(45) NOT NULL,
  `userAge` VARCHAR(45) NOT NULL,
  `userImage` TEXT NOT NULL,
  `userLocation` varchar(45) NOT NULL,
  -- `userImageId` INT NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `userId` (`userId`),
  -- KEY `userImageId` (`userImageId`),
  -- FOREIGN KEY (`userImageId`) REFERENCES `userimage` (`userImageId`) ON UPDATE CASCADE
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
  `meetingDate` varchar(45) NOT NULL,
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


  CREATE TABLE `dogSta` ( --> table 드랍하면 dogsta 로 ㄱㄱ, not dogSta
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

CREATE TABLE `likes` (
  `likeId` INT NOT NULL AUTO_INCREMENT,
  `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dogPostId` INT NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`likeId`),
  KEY `likeId` (`likeId`),
  KEY `dogPostId` (`dogPostId`),
  KEY `userId` (`userId`),
  FOREIGN KEY (`dogPostId`) REFERENCES `dogSta` (`dogPostId`) ON UPDATE CASCADE,
  FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci


-- CREATE TABLE `image` (
--   `imageId` INT NOT NULL AUTO_INCREMENT,
--   `userImage` VARCHAR(45),
--   `dogImage` VARCHAR(45),
--   `dogPostImage` VARCHAR(45),
--   `userId` INT NOT NULL,
--   PRIMARY KEY(`imageId`),
--   KEY `imageId` (`imageId`),
--   KEY `userId` (`userId`),
--   FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
-- )  ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 


-- CREATE TABLE `userImage` (
--   `userImageId` INT NOT NULL AUTO_INCREMENT,
--   `userImage` TEXT,
--   -- `userId` INT NOT NULL,
--   PRIMARY KEY(`userImageId`),
--   KEY `userImageId` (`userImageId`),
--   -- KEY `userId` (`userId`),
--   -- FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
-- ) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8mb4

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


CREATE TABLE `room` (
  `roomId` int(11) NOT NULL AUTO_INCREMENT,
  `senderNickname` VARCHAR(45) NOT NULL,
  `receiverNickname` VARCHAR(45) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`roomId`),
  KEY `roomId` (`roomId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `chat` (
  `chatId` int(11) NOT NULL AUTO_INCREMENT,
  `receiverId` int(11) NOT NULL,
  `senderId` VARCHAR(45) NOT NULL,
  `senderNickname` VARCHAR(45) NOT NULL,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(`chatId`),
  KEY `chatId` (`chatId`),
  KEY `receiverId` (`receiverId`),
  FOREIGN KEY (`receiverId`) REFERENCES `user` (`userId`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `location` (
  `locationId` int(11) NOT NULL AUTO_INCREMENT,
  `points` JSON NOT NULL,
  PRIMARY KEY(`locationId`),
  KEY `locationId` (`locationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;



