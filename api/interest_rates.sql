--
-- Table structure for table `interest_rates`
--

CREATE TABLE IF NOT EXISTS `interest_rates` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `accent_color` VARCHAR(50) DEFAULT 'blue',
    `columns` TEXT NOT NULL,
    `rows` TEXT NOT NULL,
    `order_index` INT DEFAULT 0,
    `status` ENUM('active', 'inactive') DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `interest_rates`
--

INSERT INTO `interest_rates` (`title`, `accent_color`, `columns`, `rows`, `order_index`) VALUES
('Deposit Interest Rates', 'blue', '["TENURE", "GENERAL PUBLIC (% P.A.)", "SENIOR CITIZENS (% P.A.)"]', '[["7 Days to 45 Days", "4.00%", "4.50%"], ["46 Days to 90 Days", "5.00%", "5.50%"], ["91 Days to 179 Days", "5.50%", "6.00%"], ["1 Year to 3 Years", "7.00%", "7.50%"]]', 1),
('Loan Interest Rates', 'red', '["LOAN PRODUCT", "INTEREST RATE (% P.A.)", "PROCESSING FEE"]', '[["Gold Loan", "8.50% - 11.00%", "0.50%"], ["Housing Loan", "8.75% onwards", "0.75%"], ["Vehicle Loan", "9.00% onwards", "1.00%"]]', 2);
