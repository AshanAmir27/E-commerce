-- Migrations will appear here as you chat with AI

create table users (
  id bigint primary key generated always as identity,
  first_name text not null,
  last_name text,
  email text not null unique,
  password_hash text not null,
  phone text,
  role text check (role in ('admin', 'customer')) default 'customer',
  status text check (status in ('active', 'inactive', 'blocked')) default 'active',
  email_verified boolean default false,
  last_login timestamp null,
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp
);

create table user_addresses (
  id bigint primary key generated always as identity,
  user_id bigint not null,
  address_type text check (address_type in ('billing', 'shipping')) default 'shipping',
  country text not null,
  state text,
  city text,
  postal_code text,
  address_line1 text not null,
  address_line2 text,
  is_default boolean default false,
  created_at timestamp default current_timestamp,
  foreign key (user_id) references users (id) on delete cascade
);

create table categories (
  id bigint primary key generated always as identity,
  parent_id bigint null,
  name text not null,
  slug text unique,
  description text,
  created_at timestamp default current_timestamp,
  foreign key (parent_id) references categories (id)
);

create table brands (
  id bigint primary key generated always as identity,
  brand_name text not null unique,
  logo_url text,
  created_at timestamp default current_timestamp
);

create table products (
  id bigint primary key generated always as identity,
  category_id bigint not null,
  brand_id bigint,
  name text not null,
  slug text unique,
  description text,
  status text check (status in ('draft', 'active', 'inactive')) default 'active',
  created_at timestamp default current_timestamp,
  updated_at timestamp default current_timestamp,
  foreign key (category_id) references categories (id),
  foreign key (brand_id) references brands (id)
);

create table product_variants (
  id bigint primary key generated always as identity,
  product_id bigint not null,
  sku text unique not null,
  barcode text,
  price numeric(10, 2) not null,
  cost_price numeric(10, 2),
  stock_quantity int not null default 0 check (stock_quantity >= 0),
  weight numeric(10, 2),
  attributes json,
  status text check (status in ('active', 'inactive')) default 'active',
  created_at timestamp default current_timestamp,
  reorder_level int default 10,
  foreign key (product_id) references products (id) on delete cascade
);

create table product_images (
  id bigint primary key generated always as identity,
  product_id bigint not null,
  image_url text not null,
  sort_order int default 0,
  created_at timestamp default current_timestamp,
  foreign key (product_id) references products (id) on delete cascade
);

create table carts (
  id bigint primary key generated always as identity,
  user_id bigint not null unique,
  created_at timestamp default current_timestamp,
  foreign key (user_id) references users (id) on delete cascade
);

create table cart_items (
  id bigint primary key generated always as identity,
  cart_id bigint not null,
  variant_id bigint not null,
  quantity int not null check (quantity > 0),
  created_at timestamp default current_timestamp,
  foreign key (cart_id) references carts (id) on delete cascade,
  foreign key (variant_id) references product_variants (id)
);

create table wishlist (
  id bigint primary key generated always as identity,
  user_id bigint not null,
  product_id bigint not null,
  created_at timestamp default current_timestamp,
  unique (user_id, product_id),
  foreign key (user_id) references users (id) on delete cascade,
  foreign key (product_id) references products (id) on delete cascade
);

create table orders (
  id bigint primary key generated always as identity,
  user_id bigint not null,
  order_number text unique not null,
  subtotal numeric(10, 2) not null,
  discount_amount numeric(10, 2) default 0,
  tax_amount numeric(10, 2) default 0,
  shipping_amount numeric(10, 2) default 0,
  total_amount numeric(10, 2) not null,
  order_status text check (
    order_status in (
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'returned'
    )
  ) default 'pending',
  payment_status text check (
    payment_status in ('pending', 'paid', 'failed', 'refunded')
  ) default 'pending',
  created_at timestamp default current_timestamp,
  currency text default 'PKR',
  shipping_address_snapshot json,
  billing_address_snapshot json,
  product_discount_amount numeric(10, 2) default 0,
  coupon_discount_amount numeric(10, 2) default 0,
  foreign key (user_id) references users (id)
);

create table order_items (
  id bigint primary key generated always as identity,
  order_id bigint not null,
  variant_id bigint not null,
  quantity int not null,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  discount_amount numeric(10, 2) default 0,
  tax_amount numeric(10, 2) default 0,
  foreign key (order_id) references orders (id) on delete cascade,
  foreign key (variant_id) references product_variants (id)
);

create table order_status_history (
  id bigint primary key generated always as identity,
  order_id bigint not null,
  old_status text,
  new_status text,
  changed_by bigint,
  changed_at timestamp default current_timestamp,
  foreign key (order_id) references orders (id)
);

create table payments (
  id bigint primary key generated always as identity,
  order_id bigint not null,
  payment_method text check (
    payment_method in (
      'credit_card',
      'debit_card',
      'paypal',
      'bank_transfer',
      'cash_on_delivery'
    )
  ),
  transaction_id text,
  amount numeric(10, 2) not null,
  payment_status text check (
    payment_status in ('pending', 'paid', 'failed', 'refunded')
  ) default 'pending',
  paid_at timestamp,
  created_at timestamp default current_timestamp,
  provider text,
  idempotency_key text unique,
  currency text default 'PKR',
  foreign key (order_id) references orders (id) on delete cascade
);

create table refunds (
  id bigint primary key generated always as identity,
  payment_id bigint not null,
  amount numeric(10, 2) not null,
  reason text,
  refund_status text check (
    refund_status in ('pending', 'approved', 'rejected', 'completed')
  ),
  refunded_at timestamp,
  currency text default 'PKR',
  foreign key (payment_id) references payments (id) on delete cascade
);

create table inventory_transactions (
  id bigint primary key generated always as identity,
  variant_id bigint not null,
  transaction_type text check (
    transaction_type in ('purchase', 'sale', 'return', 'adjustment')
  ),
  quantity int not null,
  previous_stock int not null,
  new_stock int not null,
  created_at timestamp default current_timestamp,
  reference_type text,
  reference_id bigint,
  foreign key (variant_id) references product_variants (id)
);

create table reviews (
  id bigint primary key generated always as identity,
  user_id bigint not null,
  product_id bigint not null,
  rating int check (rating between 1 and 5),
  review_text text,
  status text check (status in ('pending', 'approved', 'rejected')) default 'approved',
  created_at timestamp default current_timestamp,
  unique (user_id, product_id),
  foreign key (user_id) references users (id),
  foreign key (product_id) references products (id)
);

create table coupons (
  id bigint primary key generated always as identity,
  code text unique not null,
  discount_type text check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(10, 2),
  start_date date,
  end_date date,
  max_usage int,
  created_at timestamp default current_timestamp,
  min_order_value numeric(10, 2) default 0,
  usage_limit_per_user int default 1,
  is_active boolean default true,
  check (end_date >= start_date)
);

create table coupon_usage (
  id bigint primary key generated always as identity,
  coupon_id bigint not null,
  user_id bigint not null,
  order_id bigint not null,
  used_at timestamp default current_timestamp,
  foreign key (coupon_id) references coupons (id),
  foreign key (user_id) references users (id),
  foreign key (order_id) references orders (id)
);

create table daily_sales_metrics (
  metric_date date primary key,
  revenue numeric(15, 2),
  orders_count int,
  customers_count int,
  avg_order_value numeric(15, 2)
);

create table product_metrics_daily (
  id bigint primary key generated always as identity,
  metric_date date,
  product_id bigint,
  views int default 0,
  purchases int default 0,
  revenue numeric(15, 2) default 0,
  foreign key (product_id) references products (id)
);

create table customer_metrics (
  id bigint primary key generated always as identity,
  user_id bigint,
  total_orders int,
  total_spent numeric(15, 2),
  last_order_date date,
  customer_segment text check (
    customer_segment in ('new', 'regular', 'vip', 'at_risk', 'inactive')
  ),
  foreign key (user_id) references users (id),
  unique (user_id)
);

create table events (
  id bigint primary key generated always as identity,
  user_id bigint,
  event_type text check (
    event_type in (
      'product_view',
      'add_to_cart',
      'remove_from_cart',
      'checkout_started',
      'purchase_completed',
      'search',
      'wishlist_add'
    )
  ) not null,
  entity_type text,
  entity_id bigint,
  metadata json,
  created_at timestamp default current_timestamp,
  session_id text,
  device_type text,
  user_agent text,
  ip_hash text,
  foreign key (user_id) references users (id)
);

create table alerts (
  id bigint primary key generated always as identity,
  alert_type text,
  severity text check (severity in ('low', 'medium', 'high', 'critical')),
  title text,
  message text,
  status text check (status in ('active', 'resolved')) default 'active',
  created_at timestamp default current_timestamp
);

create index idx_orders_user_id on orders using btree (user_id);

create index idx_orders_created_at on orders using btree (created_at);

create index idx_order_items_order_id on order_items using btree (order_id);

create index idx_order_items_variant_id on order_items using btree (variant_id);

create index idx_payments_order_id on payments using btree (order_id);

create index idx_products_category_id on products using btree (category_id);

create index idx_products_brand_id on products using btree (brand_id);

create index idx_reviews_product_id on reviews using btree (product_id);

create index idx_events_user_id on events using btree (user_id);

create index idx_events_type on events using btree (event_type);

create index idx_events_created_at on events using btree (created_at);

create index idx_wishlist_user on wishlist using btree (user_id);

create index idx_wishlist_product on wishlist using btree (product_id);

create index idx_orders_user_status on orders using btree (user_id, order_status);

create index idx_orders_payment_status on orders using btree (payment_status);

create index idx_events_entity on events using btree (entity_type, entity_id);

create index idx_events_session on events using btree (session_id);