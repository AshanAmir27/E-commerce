create database e_commerce_analytics_system;
use e_commerce_analytics_system;

create table categories(
	category_id int auto_increment not null,
    category_name varchar(50) not null,
    primary key (category_id)
);

INSERT INTO categories (category_name) VALUES
('Electronics'),
('Clothing'),
('Home & Kitchen'),
('Books'),
('Sports'),
('Beauty'),
('Toys'),
('Automotive'),
('Groceries'),
('Health');

create table customers(
	customer_id int auto_increment not null,
    username varchar(50) not null,
    email varchar(100) unique not null,
    signup_date Date,
    city varchar(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (customer_id)
);

create table products(
	product_id int auto_increment not null,
    name varchar(100) not null,
	category_id int,
    price decimal(10,2) not null check ( price > 0 ),
    stock_quantity int not null check ( stock_quantity >= 0 ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (product_id),
    foreign key (category_id) references categories(category_id)
);


create table orders(
	order_id int auto_increment not null,
    customer_id int,
    order_date Date not null,
    status enum('completed','pending','cancelled') not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (order_id),
    foreign key (customer_id) references customers (customer_id)
);


create table order_items(
	order_item_id int auto_increment,
    order_id int,
    product_id int,
    quantity int not null check ( quantity > 0 ),
    price_at_purchase decimal(10,2) not null,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (order_item_id),
    foreign key (order_id) references orders(order_id),
    foreign key (product_id) references products(product_id)
);


create table payments(
	payment_id int auto_increment,
    order_id int,
    payment_date Date not null,
    amount decimal(10,2) not null check ( amount > 0 ),
    payment_method enum('credit_card','debit_card','paypal','cash_on_delivery'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (payment_id),
    foreign key (order_id) references orders(order_id)
);

INSERT INTO payments (order_id, payment_date, amount, payment_method)
SELECT 
  o.order_id,
  o.order_date,
  (
    SELECT SUM(oi.quantity * oi.price_at_purchase)
    FROM order_items oi
    WHERE oi.order_id = o.order_id
  ),
  ELT(FLOOR(1 + RAND()*4), 'credit_card', 'debit_card', 'paypal', 'cash_on_delivery')
FROM orders o
WHERE o.status = 'completed';

create table reviews (
	review_id int auto_increment,
    customer_id int,
    product_id int,
    rating int check ( rating between 1 and 5 ),
    review_text text,
    unique (customer_id, product_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    primary key (review_id),
    foreign key (customer_id) references customers(customer_id),
    foreign key (product_id) references products(product_id)
);

INSERT INTO reviews (customer_id, product_id, rating, review_text)
SELECT 
  FLOOR(1 + RAND()*1000),
  FLOOR(1 + RAND()*200),
  FLOOR(1 + RAND()*5),
  'Good product'
FROM dual
WHERE RAND() < 0.3
LIMIT 500;

-- 1. Basic Exploration
-- Total number of customers
select count(*) as Total_Customers from customers;

-- Total number of orders
select count(*) as Total_orders from orders;

-- Total revenue (from payments)
select count(*) as Payments from payments;

-- 2. Simple Aggregations

-- Total revenue per city
select sum(amount) as Revenue from payments;

-- Total orders per status
select status, count(*) from orders group by status;

-- Average order value
select sum(amount) / count(order_id) as average_value from payments;

-- List all orders with customer names
select c.username, o.* 
from orders o
join customers c
on o.customer_id = c.customer_id;

-- Show products with their category names
select p.name, c.category_name
from products p
join categories c
on p.category_id = c.category_id;

-- Show order items with product names
select p.name,oi.* 
from order_items oi
join products p
on oi.product_id = p.product_id;

-- Customers from Lahore
select * from customers where city = 'Lahore';

-- Orders placed in last 30 days
select * from orders where order_date >= curdate() - interval 30 day;

-- Products with price > 100
select * from products where price > 100;

-- top 5 customers in the last 30 days by spending
select * from orders where order_date >= curdate() - interval 30 day having status = 'completed';

select c.customer_id, c.username,sum(p.amount) as Total_Spent
from customers c
join orders o
on c.customer_id = o.customer_id
join payments p
on o.order_id = p.order_id
where o.order_date >= curdate() - interval 30 day -- filters last 30 days 
and o.status = 'completed' -- filters completed orderss
group by c.customer_id,c.username -- aggregate per customer
order by Total_Spent desc -- highest spenders first
limit 5; -- top 5

-- Find number of orders per customer per month
select count(o.order_id), c.username
from orders o
join customers c
on o.customer_id = c.customer_id
where o.order_date >= curdate() - interval 30 day
group by o.order_id,c.username;

SELECT 
  c.username,
  DATE_FORMAT(o.order_date, '%m') AS month,
  COUNT(o.order_id) AS total_orders
FROM orders o
JOIN customers c
  ON o.customer_id = c.customer_id
GROUP BY c.username, month
ORDER BY c.username, month
limit 4;

