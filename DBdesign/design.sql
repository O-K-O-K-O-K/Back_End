create table user(
  userId int(20) not null auto_increment,
  userEmail varchar(45) not null unique,
  password varchar(255) not null,
  userNickname varchar(45) not null ,
  userGender tinyint(1) not null,
  userAge varchar(45) not null,
  userImage text not null,
  dogId int(20) not null auto_increment,
  primary key(userId),
  foreign key(dogId) REFERENCES dogId(dogId) ON UPDATE CASCADE,
  index(userId)
);
create table dog(
  dogId int(20) not null auto_increment,
  dogGender tinyint(1) not null,
  dogName varchar(45) not null,
  dogSize varchar(45) not null,
  dogBreed varchar(45) not null,
  dogAge varchar(45) not null,
  neutral tinyint(1) not null,
  dogComment varchar(100) not null,
  dogImage text not null,
  primary key(dogId),
  index(dogId)
);
create table location(
  locationId int(20) not null auto_increment,
  locationCategory varchar(45) not null,
  longtitude varchar(45) not null,
  latitude varchar(45) not null,
  locationAddress text not null,
  primary key(locationId),
  index(locationId)
);
create table post(
  postId int(20) not null auto_increment,
  meetingTime datetime not null,
  meetingDate date not null,
  dogCount varchar(50) not null,
  wishDesc text not null,
  completed tinyint not null,
  locationId int(20) not null auto_increment,
  userId int(20) not null auto_increment,
  primary key(postId),
  foreign key(locationId) REFERENCES location(locationId) ON UPDATE CASCADE,
  foreign key(userId) REFERENCES user(userId) ON UPDATE CASCADE,
  index(postId)
);