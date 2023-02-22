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
  `profile` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.serviceOrder definition

CREATE TABLE `service_order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.orderDetail definition

CREATE TABLE `order_detail` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.product definition

CREATE TABLE `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `group` int DEFAULT NULL,
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
  `last_supplier_id` int DEFAULT NULL,
  `item_type` varchar(20) DEFAULT NULL,
  `references` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Campservice.product_group definition
CREATE TABLE `product_group` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(30) DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.`user` definition

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
)
