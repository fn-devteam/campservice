-- Campservice.supplier definition

CREATE TABLE `supplier` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `active` int DEFAULT NULL,
  `person_type` varchar(20) DEFAULT NULL,
  `cpf_cnpj` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `state_registration` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `zip_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cell_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email_address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `contact_person` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `obs` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.vehicle definition

CREATE TABLE `vehicle` (
  `id` int unsigned  NOT NULL AUTO_INCREMENT,
  `license_plate` varchar(10) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `year` int NOT NULL,
  `current_km` int NOT NULL,
  `km_oil_change` int NOT NULL,
  `km_last_oil_change` int NOT NULL,
  `km_change_timing_belt` int NOT NULL,
  `km_last_timing_belt_change` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.product_group definition

CREATE TABLE `product_group` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `group_name` varchar(30) DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.customer definition

CREATE TABLE `customer` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fantasy_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `active` int DEFAULT NULL,
  `person_type` varchar(20) DEFAULT NULL,
  `cpf_cnpj` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `state_registration` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  `phone_number` varchar(11) DEFAULT NULL,
  `cell_number` varchar(11) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `zip_code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `district` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `profile` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.product definition

CREATE TABLE `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `group_id` int unsigned DEFAULT NULL,
  `active` int DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `unit` varchar(100) DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  `purchase_price` float DEFAULT NULL,
  `current_inventory` float DEFAULT NULL,
  `minimum_stock` float DEFAULT NULL,
  `sale_price` float DEFAULT NULL,
  `price_value` float DEFAULT NULL,
  `profit_margin` float DEFAULT NULL,
  `factory_index` float DEFAULT NULL,
  `list_price` float DEFAULT NULL,
  `rebate` float DEFAULT NULL,
  `original_code` varchar(100) DEFAULT NULL,
  `original_code1` varchar(100) DEFAULT NULL,
  `quantity_last_entry` float DEFAULT NULL,
  `product_location` varchar(100) DEFAULT NULL,
  `last_supplier_id` int unsigned DEFAULT NULL,
  `item_type` varchar(20) DEFAULT NULL,
  `references` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
PRIMARY KEY (`id`),
FOREIGN KEY (`group_id`)  REFERENCES product_group(`id`),
FOREIGN KEY (`last_supplier_id`)  REFERENCES supplier(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.service_order definition

CREATE TABLE `service_order` (
 `id` int unsigned NOT NULL AUTO_INCREMENT,
 `customer_id` int unsigned NOT NULL,
 `vehicle_id` int unsigned NOT NULL,
 `entry_date` date NOT NULL,
 `delivery_date` date DEFAULT NULL,
 `amount` double DEFAULT NULL,
 `rebate` double DEFAULT NULL,
 `obs` varchar(200) DEFAULT NULL,
 `current_km` int DEFAULT NULL,
 `status` varchar(30) DEFAULT NULL,
 PRIMARY KEY (`id`),
 FOREIGN KEY (customer_id) REFERENCES customer(id),
 FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.order_detail definition

CREATE TABLE `order_detail` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `service_order_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `amount` float NOT NULL,
  `unitary_value` float DEFAULT NULL,
  `rebate` float DEFAULT NULL,
  `obs` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`service_order_id`) REFERENCES service_order(id),
  FOREIGN KEY (`product_id`) REFERENCES product(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.`user` definition

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.`product_supplier` definition

CREATE TABLE `product_supplier` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `product_id`  int unsigned NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  `last_purchase_date` timestamp,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES product(`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`supplier_id`) REFERENCES supplier(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.`customer_vehicle` definition

CREATE TABLE `customer_vehicle` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `customer_id`  int unsigned NOT NULL,
  `vehicle_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`customer_id`) REFERENCES product(`id`)
    ON DELETE CASCADE,
  FOREIGN KEY (`vehicle_id`) REFERENCES supplier(`id`)
    ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.stock_entry definition

CREATE TABLE `stock_entry` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `document_number` int NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  `payment_type` int NOT NULL,
  `canceled` tinyint(1) NOT NULL,
  `movement_type` int NOT NULL,
  `amount` float NOT NULL,
  `entry_date` date NOT NULL,
  `cancel_date` date DEFAULT NULL,
  `obs` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.entry_detail definition

CREATE TABLE `entry_detail` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `entry_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `amount` float NOT NULL,
  `unitary_value` float NOT NULL,
  `obs` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  FOREIGN KEY (`entry_id`) REFERENCES `stock_entry` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;