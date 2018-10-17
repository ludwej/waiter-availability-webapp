create table weekdays(
	id serial not null primary key,
	weekdays text not null,
);
create table waiters(
	id serial not null primary key,
	waiter text not null,
);
create table shift(
	id serial not null primary key,
	waiter text not null,
);
