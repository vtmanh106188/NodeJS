-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 16, 2022 at 05:50 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs-asm`
--

-- --------------------------------------------------------

--
-- Table structure for table `categoies`
--

CREATE TABLE `categoies` (
  `idCat` int(11) NOT NULL,
  `nameCat` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categoies`
--

INSERT INTO `categoies` (`idCat`, `nameCat`) VALUES
(1, 'Rau Xanh'),
(2, 'Trái Cây'),
(3, 'Củ'),
(4, 'Hạt');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `idOr` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_address` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone` int(15) NOT NULL,
  `create_date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`idOr`, `customer_name`, `customer_address`, `customer_email`, `customer_phone`, `create_date`, `status`) VALUES
(1, 'Vu The Manh', 'Thu Duc', 'vtmanh106188@gmail.com', 879516481, '2022-11-14', 'Chờ xác nhận');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `idOrD` int(11) NOT NULL,
  `idOr` int(11) NOT NULL,
  `idSP` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unti_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`idOrD`, `idOr`, `idSP`, `quantity`, `unti_price`) VALUES
(1, 1, 1, 1, 20000),
(2, 1, 2, 1, 20000);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `idSP` int(11) NOT NULL,
  `nameSP` varchar(255) NOT NULL,
  `priceSP` int(11) NOT NULL,
  `detailSP` varchar(255) NOT NULL,
  `imageSP` varchar(255) NOT NULL,
  `idCat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`idSP`, `nameSP`, `priceSP`, `detailSP`, `imageSP`, `idCat`) VALUES
(1, 'Cải Ngọt', 20000, 'Cải Ngọt Tươi Xanh', 'cai-ngot.png', 1),
(2, 'Cải Xanh', 20000, 'Cảnh Xanh Nè', 'cai-xanh.jpg', 1),
(3, 'Hành Lá', 20000, 'Hành Lá Nè', 'hanh-la.png', 1),
(4, 'Mồng Tơi', 20000, 'Mồng Tơi Nè', 'mong-toi.png', 1),
(5, 'Rau Dền', 20000, 'Rau Dền Nè', 'rau-den.jpeg', 1),
(6, 'Rau Muống', 20000, 'Rau Muống Nè', 'rau-muong.jpeg', 1),
(7, 'Xà Lách Đà Lạt', 20000, 'Đà Lạt welcome', 'xa-lach-da-lat.jpeg', 1),
(8, 'Cherry', 20000, 'Cherry Ngon', 'cherry.jpg', 2),
(9, 'Chôm Chôm', 20000, 'Chôm Chôm Ngon Nhức Néc', 'chom-chom.jpeg', 2),
(10, 'Dưa Lưới', 20000, 'Dưa Lưới Ble Ble', 'dua-luoi.png', 2),
(11, 'Măng Cụt', 20000, 'Măng Cụt mà không cụt nè', 'mang-cut.jpg', 2),
(12, 'Nhãn', 20000, 'Nhãn Lồnggggggg', 'nhan.jpg', 2),
(13, 'Thơm', 20000, 'Thơm vào môi em', 'thom.jpg', 2),
(14, 'Dâu Tây', 20000, 'Dâu Tây nhưng a lại thích Dâu Ta', 'dau-tay.jpg', 2),
(15, 'Chuối', 20000, 'Chuối siêu to khổng lồ', 'chuoi.jpg', 2),
(16, 'Sầu Riêng', 20000, 'Sầu Tím Thiệp Hồng', 'sau-rieng.jpg', 2),
(17, 'Bơ', 20000, 'Bơ Luônnnnn', 'trai-bo.jpg', 2),
(18, 'Bí Đỏ', 20000, 'Bí Đỏ Nè', 'bi-do.jpeg', 3),
(19, 'Cà Chua', 20000, 'Cà Chua Mọng Nước', 'ca-chua.jpg', 3),
(20, 'Cà Rốt', 20000, 'Cà Rốt BLe', 'ca-rot.jpg', 3),
(21, 'Dưa Leo', 20000, 'Dưa Leo siêu dài', 'dua-leo.jpg', 3),
(22, 'Hành Tây', 20000, 'Hành Tây Nè', 'hanh-tay.jpg', 3),
(23, 'Hành Tím', 20000, 'Hành Tím Mộng Mơ', 'hanh-tim.jpg', 3),
(24, 'Khoai Lang', 20000, 'Khoai Lang Nè', 'khoai-lang.jpeg', 3),
(25, 'Khoai Sọ', 20000, 'Khoai Sọ Dừa', 'khoai-so.jpg', 3),
(26, 'Khoai Tây', 20000, 'Khoai Cực Tây', 'khoai-tay.jpg', 3),
(27, 'Mướp', 20000, 'Mướp Bà Nội Em', 'muop.jpg', 3),
(28, 'Su Hào', 20000, 'Su Hào nè', 'su-hao.png', 3),
(29, 'Súp Lơ', 20000, 'Súp Lơ Lơ Lơ', 'sup-lo.jpg', 3),
(30, 'Đậu Cove', 20000, 'Đậu Cove', 'dau-cove.jpg', 3),
(32, 'Hạnh Nhân', 20000, 'Hạnh Nhân Tâm', 'hanh-nhan.jpg', 4),
(33, 'Hạt Điều', 20000, 'Hạt Điều Nè', 'hat-dieu.jpg', 4),
(34, 'Macca', 20000, 'Macca Nè', 'macca.jpg', 4),
(35, 'Ớt Hiểm', 20000, 'Ớt Hiểm đúng hiểm', 'ot-hiem.jpg', 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categoies`
--
ALTER TABLE `categoies`
  ADD PRIMARY KEY (`idCat`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`idOr`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`idOrD`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`idSP`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categoies`
--
ALTER TABLE `categoies`
  MODIFY `idCat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `idOr` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `idOrD` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `idSP` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
