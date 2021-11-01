CREATE TABLE user(  
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_email VARCHAR(45) NOT NULL,
    password VARCHAR(255) NOT NULL,
    user_nickname VARCHAR(45) NOT NULL,
    user_gender TINYINT(1) NOT NULL,
    user_age VARCHAR(45) NOT NULL,
    user_image TEXT NOT NULL,
    dog_id INT NOT NULL,
    INDEX(user_id),
    INDEX(dog_id));

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
  default character set = utf8,
  primary key(dogId),
  index(dogId)
);
create table location(
  locationId int(20) not null auto_increment,
  locationCategory varchar(45) not null,
  longtitude varchar(45) not null,
  latitude varchar(45) not null,
  locationAddress text not null,
  default character set = utf8,
  primary key(locationId),
  index(locationId)
);
-- create table post(
  -- postId int(20) not null auto_increment,
  -- meetingTime datetime not null,
  -- meetingDate date not null,
  -- dogCount varchar(50) not null,
  -- wishDesc text not null,
  -- completed tinyint not null,
  -- locationId int(20) not null auto_increment,
  -- userId int(20) not null auto_increment,
  -- created_at datetime not null default now(),
  -- default character set = utf8,
  -- primary key(postId),
  -- foreign key(locationId) REFERENCES location(locationId) ON UPDATE CASCADE,
  -- foreign key(userId) REFERENCES user(userId) ON UPDATE CASCADE,
  -- index(postId)
)

-- create table post(
--   post_id int(20) not null auto_increment,
--   meeting_time datetime not null,
--   meeting_date date not null,
--   dog_count varchar(50) not null,
--   wish_desc text not null,
--   completed tinyint not null,
--   location_id int(20) not null auto_increment,
--   user_id int(20) not null auto_increment,
--   created_at datetime not null default now(),
--   default character set = utf8,
--   primary key(post_id),
--   foreign key(location_id) REFERENCES location(location_id) ON UPDATE CASCADE,
--   foreign key(user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
--   index(post_id)
-- ); //한 테이블에 한 auto_increment가 있어야 한다!


create table post(
  post_id INT(20) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  meeting_time DATETIME NOT NULL,
  meeting_date DATE NOT NULL,
  dog_count VARCHAR(50) NOT NULL,
  wish_desc TEXT NOT NULL,
  completed TINYINT NOT NULL,
  location_id INT(20) NOT NULL,
  user_id INT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT now(),
  FOREIGN KEY(user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
  INDEX(post_id));
