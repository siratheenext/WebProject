create database AdminAccounts;
use AdminAccounts;

create table adminacc(
	username varchar(30) not null,
    pw varchar(30) not null,
    primary key(username)
);

insert into adminacc (username,pw) values
	('NokKiWi','Kiwikiwi'),
    ('dewmsr','tenlovelove'),
    ('nextsirathee','moreanycoffee'),
    ('HeangKung','heanglovemoney');
    
select * from adminacc;
