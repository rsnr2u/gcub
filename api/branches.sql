-- Branch Network Schema

CREATE TABLE IF NOT EXISTS `branches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `region` varchar(255) DEFAULT NULL,
  `ifsc` varchar(50) DEFAULT NULL,
  `micr` varchar(50) DEFAULT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `google_maps_link` text DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table `branches`

INSERT INTO `branches` (`id`, `name`, `region`, `ifsc`, `micr`, `contact`, `email`, `address`, `google_maps_link`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Kothapet Branch', 'GUNTUR • GUNTUR DIST.', 'GCUB0000003', '522000004', '0863-2220002', 'kothapet@gcub.com', 'Near Market, Kothapet, Guntur - 522001', 'https://maps.google.com/?q=Near+Market,+Kothapet,+Guntur+-+522001', 'active', NOW(), NOW()),
(2, 'Main Branch', 'GUNTUR • GUNTUR DIST.', 'IBKL0000001', '522000002', '0863-2220000', 'main@gcub.com', '3/2 Arundelpet, Guntur - 522002', 'https://maps.google.com/?q=3/2+Arundelpet,+Guntur+-+522002', 'active', NOW(), NOW());
