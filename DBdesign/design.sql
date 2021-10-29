create table user(
	userId int(20) not null auto_increment,
	userEmail varchar(50) not null unique,
	userPw varchar(255) not null,
    userNickname varchar(40) not null unique,
    userGener tinyint not null,
    userAge varchar(255) not null,
    userimage text,
	primary key(userId),
	index(userNickname)

