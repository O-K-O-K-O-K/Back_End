create table user(
  user_id int(20) not null auto_increment,
  user_email varchar(45) not null,
  password varchar(255) not null,
  user_nickname varchar(45) not null,
  user_gender tinyint(1) not null,
  user_age varchar(45) not null,
  user_image text not null,
  dog_id int(20) not null,
  default character set = utf8,
  primary key(user_id),
  foreign key(dog_id) REFERENCES dog(dog_id) ON UPDATE CASCADE,
  index(user_id)
  index(dog_id)
);
create table dog(
  dog_id int(20) not null auto_increment,
  dog_gender tinyint(1) not null,
  dog_name varchar(45) not null,
  dog_size varchar(45) not null,
  dog_breed varchar(45) not null,
  dog_age varchar(45) not null,
  neutral tinyint(1) not null,
  dog_comment varchar(100) not null,
  dog_image text not null,
  default character set = utf8,
  primary key(dog_id),
  index(dog_id)
);

create table location(
  location_id int(20) not null auto_increment,
  location_category varchar(45) not null,
  longtitude varchar(45) not null,
  latitude varchar(45) not null,
  location_address text not null,
  default character set = utf8,
  primary key(location_id),
  index(location_id)
);

create table post(
  post_id int(20) not null auto_increment,
  meeting_time datetime not null,
  meeting_date date not null,
  dog_count varchar(50) not null,
  wish_desc text not null,
  completed tinyint not null,
  location_id int(20) not null auto_increment,
  user_id int(20) not null auto_increment,
  created_at datetime not null default now(),
  default character set = utf8,
  primary key(post_id),
  foreign key(location_id) REFERENCES location(location_id) ON UPDATE CASCADE,
  foreign key(user_id) REFERENCES user(user_id) ON UPDATE CASCADE,
  index(post_id)
);