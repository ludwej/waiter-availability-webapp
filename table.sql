DROP table if EXISTS waiters, weekdays,shift CASCADE;

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
	day_id int not null,
	waiter_id int not null,
	foreign key (day_id) REFERENCES weekdays(id),
	foreign key (waiter_id) REFERENCES waiters(id)
);

insert into weekdays (day) values ('Monday');
insert into weekdays (day) values ('Tuesday');
insert into weekdays (day) values ('Wednesday');
insert into weekdays (day) values ('Thursday');
insert into weekdays (day) values ('Friday');
insert into weekdays (day) values ('Saturday');
insert into weekdays (day) values ('Sunday');

