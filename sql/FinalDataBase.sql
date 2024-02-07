-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: tracker_sql
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provider` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `providerAccountId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `refresh_token` text COLLATE utf8mb4_unicode_ci,
  `access_token` text COLLATE utf8mb4_unicode_ci,
  `expires_at` int DEFAULT NULL,
  `token_type` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scope` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_token` text COLLATE utf8mb4_unicode_ci,
  `session_state` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Account_provider_providerAccountId_key` (`provider`,`providerAccountId`),
  KEY `Account_userId_fkey` (`userId`),
  CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `issue`
--

DROP TABLE IF EXISTS `issue`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issue` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('OPEN','IN_PROGRESS','CLOSED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'OPEN',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updateAt` datetime(3) NOT NULL,
  `assigninedToUserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Issue_userId_fkey` (`assigninedToUserId`),
  CONSTRAINT `Issue_userId_fkey` FOREIGN KEY (`assigninedToUserId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issue`
--

LOCK TABLES `issue` WRITE;
/*!40000 ALTER TABLE `issue` DISABLE KEYS */;
INSERT INTO `issue` VALUES 
(1,'Updated title++','Updated description','CLOSED','2024-01-30 17:54:22.178','2024-02-03 16:56:24.994',4),
(4,'Updated title','Updated description','IN_PROGRESS','2024-01-30 19:33:25.725','2024-02-03 14:29:15.133',NULL),
(8,'wewewe','erererer','OPEN','2024-01-30 19:40:55.866','2024-02-03 13:38:58.240',4),
(9,'Signed to John+++','qwqwqw','OPEN','2024-01-30 19:41:14.021','2024-02-03 14:08:20.136',5),
(10,'drrr','ttrtr','OPEN','2024-01-30 19:42:19.340','2024-02-03 16:38:29.610',4),
(12,'dffdf','6776767','OPEN','2024-01-30 19:44:16.347','2024-02-03 16:38:08.852',5),
(13,'rtyui','qwert','OPEN','2024-01-30 20:00:07.497','2024-01-30 20:00:07.497',NULL),
(14,'new issue','description','OPEN','2024-01-30 20:00:40.847','2024-02-04 14:13:17.652',4),
(15,'super issue','new supper issue description','OPEN','2024-01-30 20:01:18.377','2024-01-30 20:01:18.377',NULL),
(16,'redirectPath','Description','OPEN','2024-01-30 20:07:37.108','2024-01-30 20:07:37.108',NULL),
(17,'Tailwind Prose',' **Title**\n *italic*\n*  first point\n*  second point','OPEN','2024-01-31 12:02:37.824','2024-01-31 12:02:37.824',NULL),
(18,'New issue','Any discription','OPEN','2024-01-31 12:03:24.348','2024-01-31 12:03:24.348',NULL),
(19,'qwqwer','ecccwecewc','OPEN','2024-01-31 12:03:45.454','2024-01-31 12:03:45.454',NULL),
(20,'use server','description','OPEN','2024-01-31 12:06:15.278','2024-01-31 12:06:15.278',NULL),(21,'use server second attempt','Hello world!','OPEN','2024-01-31 12:06:52.565','2024-01-31 12:06:52.565',NULL),(22,'without router.refresh','hello world','OPEN','2024-01-31 12:07:47.718','2024-02-03 16:58:20.463',4),(23,'last attempt without router.refresh()','last attempt','OPEN','2024-01-31 12:08:33.653','2024-01-31 12:08:33.653',NULL),(24,'new attempt without router refresh','sdsd','OPEN','2024-01-31 12:09:19.249','2024-02-04 14:13:34.844',5),(25,'2323','2323','OPEN','2024-01-31 12:10:19.617','2024-01-31 12:10:19.617',NULL),(26,'1','1','OPEN','2024-01-31 12:11:59.779','2024-01-31 12:11:59.779',NULL),(27,'2','2','OPEN','2024-01-31 12:12:06.917','2024-01-31 12:12:06.917',NULL),(28,'3','3','OPEN','2024-01-31 12:12:16.017','2024-01-31 12:12:16.017',NULL),(29,'4','4','OPEN','2024-01-31 12:12:24.066','2024-01-31 12:12:24.066',NULL),(30,'5','5','OPEN','2024-01-31 12:12:47.133','2024-01-31 12:12:47.133',NULL),(31,'refactored code','description','OPEN','2024-01-31 16:17:12.233','2024-01-31 16:17:12.233',NULL),(32,'new issue after refactoring','description','OPEN','2024-01-31 16:18:02.542','2024-01-31 16:18:02.542',NULL),(33,'blabla','description','OPEN','2024-01-31 16:23:52.237','2024-01-31 16:23:52.237',NULL),(34,'new super issue','description','OPEN','2024-01-31 16:26:29.898','2024-01-31 16:26:29.898',NULL),(35,'new issue','description','OPEN','2024-01-31 16:28:00.949','2024-01-31 16:28:00.949',NULL),(36,'new trouble','description','OPEN','2024-01-31 16:28:39.117','2024-01-31 16:28:39.117',NULL),(37,'finally block','description','OPEN','2024-01-31 16:30:24.839','2024-01-31 16:30:24.839',NULL),(38,'router push again','hello','OPEN','2024-01-31 16:33:59.356','2024-01-31 16:33:59.356',NULL),(39,'hello','hey','OPEN','2024-01-31 16:34:23.110','2024-01-31 16:34:23.110',NULL),(40,'new attemt','description','OPEN','2024-01-31 16:34:43.139','2024-01-31 16:34:43.139',NULL),(41,'title','description','OPEN','2024-01-31 16:36:10.787','2024-01-31 16:36:10.787',NULL),(42,'router push','description','OPEN','2024-01-31 16:36:58.262','2024-01-31 16:36:58.262',NULL),(43,'sdsds','sdsdsd','OPEN','2024-01-31 16:37:08.882','2024-01-31 16:37:08.882',NULL),(44,'hey','hey','OPEN','2024-01-31 16:44:21.459','2024-01-31 16:44:21.459',NULL),(45,'new issue','description','OPEN','2024-01-31 16:55:12.750','2024-01-31 16:55:12.750',NULL),(46,'wert','wert','OPEN','2024-01-31 17:05:45.768','2024-01-31 17:05:45.768',NULL),(47,'Monday','D','OPEN','2024-01-31 17:08:03.699','2024-01-31 17:08:03.699',NULL),(48,'Tuesday','D','OPEN','2024-01-31 17:08:23.857','2024-01-31 17:08:23.857',NULL),(49,'Wednesday','D','OPEN','2024-01-31 17:14:51.099','2024-02-07 12:31:33.443',5),(50,'Thursday','D','OPEN','2024-01-31 17:15:07.898','2024-02-07 11:53:54.290',4);
/*!40000 ALTER TABLE `issue` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionToken` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int NOT NULL,
  `expires` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  KEY `Session_userId_fkey` (`userId`),
  CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emailVerified` datetime(3) DEFAULT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hashedPassword` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (4,'Alex','cat2021@gmail.com',NULL,'https://lh3.googleusercontent.com/a/ACg8ocJIq3noMrKZETi17Sv7L53F5_i6kFl_IEgY4Audz2A43w=s96','$2b$10$TsQQHrTGMWAbOCDoG0XG2uydfhhfhx/kIqIZu2oalgwUhUGkzabX6'),(5,'John','dog2021@gmail.com',NULL,NULL,'$2b$10$Je2sHXKu62tMzeuS7PGTHu.aIMEQRPicTvad9vj3VTQ41lQS7lMnK');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verificationtoken`
--

DROP TABLE IF EXISTS `verificationtoken`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verificationtoken` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expires` datetime(3) NOT NULL,
  UNIQUE KEY `VerificationToken_token_key` (`token`),
  UNIQUE KEY `VerificationToken_identifier_token_key` (`identifier`,`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verificationtoken`
--

LOCK TABLES `verificationtoken` WRITE;
/*!40000 ALTER TABLE `verificationtoken` DISABLE KEYS */;
/*!40000 ALTER TABLE `verificationtoken` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-07 13:32:12
