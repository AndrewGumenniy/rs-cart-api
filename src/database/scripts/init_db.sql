create extension if not exists "uuid-ossp";
create type status_type as enum('OPEN', 'ORDERED');

create table if not exists carts(
	id uuid primary key default uuid_generate_v4(),
	user_id uuid not null,
  created_at date not null default now(),
  updated_at date not null default now(),
  status status_type,
	foreign key(user_id) references users(id)
);

create table if not exists products(
	id uuid primary key default uuid_generate_v4(),
	title text not null,
  description text not null,
  price numeric not null
);

create table if not exists cart_items(
  cart_id uuid not null,
  product_id uuid not null,
  count integer,
  foreign key(cart_id) references carts(id) on delete cascade,
  foreign key(product_id) references products(id)
);

create table if not exists users (
	id uuid primary key default uuid_generate_v4(),
	name text not null,
	password text not null
);

create table if not exists orders(
	id uuid primary key default uuid_generate_v4(),
	cart_id uuid not null,
	user_id uuid not null,
	payment json,
  delivery json,
  comments text,
  status status_type,
  total numeric not null,
  foreign key(cart_id) references carts(id),
  foreign key(user_id) references users(id)
);
