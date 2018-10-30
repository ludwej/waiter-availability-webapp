DROP table if EXISTS waiters, weekdays,shift;

create table waiters(
	id serial not null primary key,
	waiter text not null
);

create table weekdays(
	id serial not null primary key,
	day text not null
);

create table shift(
	id serial not null primary key,
	day_id int,
	waiter_id int,
	foreign key (day_id) REFERENCES weekdays(id),
	foreign key (waiter_id) REFERENCES waiters(id)
);

insert into weekdays (day) values ('Mon');
insert into weekdays (day) values ('Tue');
insert into weekdays (day) values ('Wed');
insert into weekdays (day) values ('Thu');
insert into weekdays (day) values ('Fri');
insert into weekdays (day) values ('Sat');
insert into weekdays (day) values ('Sun');

