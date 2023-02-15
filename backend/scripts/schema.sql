-- Campservice.customer definition

CREATE TABLE `customer` (
  `id` double NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `fantasy_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `active` int DEFAULT NULL,
  `person_type` int DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=478 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.orderDetail definition

CREATE TABLE `orderDetail` (
  `id` double NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.product definition

CREATE TABLE `product` (
  `id` double NOT NULL AUTO_INCREMENT,
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
  `last_supplier` int DEFAULT NULL,
  `item_type` int DEFAULT NULL,
  `references` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8245 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.productsGroups definition

CREATE TABLE `productsGroups` (
  `id` double NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.serviceOrder definition

CREATE TABLE `serviceOrder` (
  `id` double NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.supplier definition

CREATE TABLE `supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `zip_code` varchar(8) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `number` int DEFAULT NULL,
  `person_type` int DEFAULT NULL,
  `active` int DEFAULT NULL,
  `last_purchase` int DEFAULT NULL,
  `district` varchar(100) DEFAULT NULL,
  `phone_number` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cell_number` varchar(11) DEFAULT NULL,
  `email_address` varchar(100) DEFAULT NULL,
  `obs` varchar(100) DEFAULT NULL,
  `registration_date` date DEFAULT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `state_registration` varchar(100) DEFAULT NULL,
  `cpf_cnpj` varchar(100) DEFAULT NULL,
  `state` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Campservice.`user` definition

CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `last_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `User_Id_IDX` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
