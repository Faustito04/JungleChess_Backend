USE [master]
GO
/****** Object:  Database [JungleChess]    Script Date: 02/05/2022 8:11:23 ******/
CREATE DATABASE [JungleChess]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'JungleChess', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\JungleChess.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'JungleChess_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.MSSQLSERVER\MSSQL\DATA\JungleChess_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [JungleChess] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [JungleChess].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [JungleChess] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [JungleChess] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [JungleChess] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [JungleChess] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [JungleChess] SET ARITHABORT OFF 
GO
ALTER DATABASE [JungleChess] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [JungleChess] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [JungleChess] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [JungleChess] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [JungleChess] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [JungleChess] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [JungleChess] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [JungleChess] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [JungleChess] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [JungleChess] SET  DISABLE_BROKER 
GO
ALTER DATABASE [JungleChess] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [JungleChess] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [JungleChess] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [JungleChess] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [JungleChess] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [JungleChess] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [JungleChess] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [JungleChess] SET RECOVERY FULL 
GO
ALTER DATABASE [JungleChess] SET  MULTI_USER 
GO
ALTER DATABASE [JungleChess] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [JungleChess] SET DB_CHAINING OFF 
GO
ALTER DATABASE [JungleChess] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [JungleChess] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [JungleChess] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'JungleChess', N'ON'
GO
ALTER DATABASE [JungleChess] SET QUERY_STORE = OFF
GO
USE [JungleChess]
GO
/****** Object:  User [alumno]    Script Date: 02/05/2022 8:11:24 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Game]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Game](
	[gameID] [int] NULL,
	[viewCount] [int] NULL,
	[status] [bit] NULL,
	[date] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gamemode]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gamemode](
	[gamemodeID] [int] NULL,
	[name] [varchar](30) NULL,
	[playersPerGame] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GameXUser]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GameXUser](
	[gameID] [int] NULL,
	[userID] [int] NULL,
	[role] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GlobalStat]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GlobalStat](
	[gamemodeID] [int] NULL,
	[name] [varchar](30) NULL,
	[value] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Move]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Move](
	[gameID] [int] NULL,
	[turn] [int] NULL,
	[move] [char](1) NULL,
	[piece] [varchar](3) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Relationship]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Relationship](
	[user1] [int] NULL,
	[user2] [int] NULL,
	[status] [char](1) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Suspension]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suspension](
	[suspendedID] [int] NULL,
	[suspenderID] [int] NULL,
	[suspensionDate] [date] NULL,
	[unsuspendDate] [date] NULL,
	[reason] [varchar](400) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[ID] [int] NULL,
	[name] [varchar](30) NULL,
	[status] [bit] NULL,
	[imageUrl] [varchar](500) NULL,
	[lastConnected] [datetime] NULL,
	[typeOfUser] [char](1) NULL,
	[role] [char](1) NULL,
	[description] [varchar](600) NULL,
	[creationDate] [date] NULL,
	[mail] [varchar](255) NULL,
	[dayStreak] [int] NULL,
	[friendCount] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserStat]    Script Date: 02/05/2022 8:11:24 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserStat](
	[userID] [int] NULL,
	[gamemodeID] [int] NULL,
	[name] [varchar](30) NULL,
	[value] [int] NULL
) ON [PRIMARY]
GO
USE [master]
GO
ALTER DATABASE [JungleChess] SET  READ_WRITE 
GO
