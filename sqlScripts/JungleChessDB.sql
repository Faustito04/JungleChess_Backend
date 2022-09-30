USE [master]
GO
/****** Object:  Database [JungleChess]    Script Date: 26/8/2022 11:23:26 ******/
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
/****** Object:  User [alumno]    Script Date: 26/8/2022 11:23:26 ******/
CREATE USER [alumno] FOR LOGIN [alumno] WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[Game]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Game](
	[gameId] [varchar](40) NOT NULL,
	[viewCount] [int] NULL,
	[date] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Gamemode]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Gamemode](
	[gamemodeId] [int] NULL,
	[name] [varchar](30) NULL,
	[playersPerGame] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GameXUser]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GameXUser](
	[gameId] [int] NULL,
	[userId] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[GlobalStat]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[GlobalStat](
	[gamemodeId] [int] NULL,
	[name] [varchar](30) NULL,
	[value] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Move]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Move](
	[gameId] [int] NULL,
	[turn] [int] NULL,
	[move] [char](1) NULL,
	[piece] [varchar](3) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Relationship]    Script Date: 26/8/2022 11:23:26 ******/
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
/****** Object:  Table [dbo].[Suspension]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Suspension](
	[suspendedId] [int] IDENTITY(1,1) NOT NULL,
	[suspenderId] [int] NULL,
	[suspensionDate] [date] NULL,
	[unsuspendDate] [date] NULL,
	[reason] [varchar](400) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[User]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[userId] [int] NULL,
	[name] [varchar](30) NULL,
	[status] [varchar](15) NULL,
	[imageUrl] [varchar](500) NULL,
	[lastConnected] [datetime] NULL,
	[typeOfUser] [char](1) NULL,
	[role] [char](1) NULL,
	[description] [varchar](600) NULL,
	[creationDate] [date] NULL,
	[mail] [varchar](255) NULL,
	[streak] [int] NULL,
	[friendCount] [int] NULL,
	[service] [varchar](30) NULL,
	[birthDate] [date] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGamemodeStats]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGamemodeStats](
	[userId] [int] NULL,
	[gamemodeId] [int] NULL,
	[gamesPlayed] [int] NULL,
	[gamesWon] [int] NULL,
	[gamesTied] [int] NULL,
	[gamesLost] [int] NULL,
	[elo] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserGlobalStats]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserGlobalStats](
	[id] [int] NULL,
	[gamesPlayed] [int] NULL,
	[gamesWon] [int] NULL,
	[gamesLost] [int] NULL,
	[hoursPlayed] [int] NULL,
	[gamesTied] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserStat]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserStat](
	[userId] [int] NULL,
	[gamemodeId] [int] NULL,
	[name] [varchar](30) NULL,
	[value] [int] NULL
) ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[createGame]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createGame]
AS
	INSERT INTO Game (viewCount, [date])
	VALUES (0, GETDATE())
GO
/****** Object:  StoredProcedure [dbo].[createGamemodeStats]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createGamemodeStats]
	@userId int,
	@gamemodeId int,
	@elo int
AS
	INSERT INTO userGamemodeStats (userId, gamemodeId, gamesPlayed, gamesWon, gamesTied, gamesLost)
	VALUES (@userId, @gamemodeId, 0, 0, 0, 0, @elo)
GO
/****** Object:  StoredProcedure [dbo].[createGameXUser]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createGameXUser]
	@userId int,
	@gameId int
AS
BEGIN
	SET NOCOUNT ON;
	INSERT INTO gameXUser (gameId, userId)
	VALUES (@gameId, @userId)
END
GO
/****** Object:  StoredProcedure [dbo].[createGlobalStats]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[createGlobalStats]
	@id int
AS
	INSERT INTO userGlobalStats (id, gamesPlayed, gamesWon, gamesTied, gamesLost)
	VALUES (@id, 0, 0, 0, 0)
GO
/****** Object:  StoredProcedure [dbo].[createUser]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[createUser]
	@name varchar(30), @imageUrl varchar(500), @description varchar(600), @service varchar(30), @birthDate datetime
AS
	INSERT INTO [User] ([name], [status], imageUrl, [role], [description], [service], streak, friendCount, creationDate, birthDate) 
	VALUES (@name, 'o', @imageUrl, 'u', @description, @service, 1, 0, CURRENT_TIMESTAMP, @birthDate)
GO
/****** Object:  StoredProcedure [dbo].[getGameByPlayerId]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getGameByPlayerId]
	@userId int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM Game INNER JOIN GameXUser on GameXUser.gameId = Game.gameId WHERE GameXUser.userId = @userId
END
GO
/****** Object:  StoredProcedure [dbo].[getMoves]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[getMoves]
	@gameId int
AS
BEGIN
	SET NOCOUNT ON;
	SELECT * FROM [Move] INNER JOIN Game on [Move].gameID = Game.gameId WHERE Game.gameId = @gameId
END
GO
/****** Object:  StoredProcedure [dbo].[updateGamemodeStatsElo]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateGamemodeStatsElo]
	@userId int,
	@gamemodeId int,
	@elo int
AS
	UPDATE UserGamemodeStats
	SET elo = @elo
	WHERE userId = @userId AND gamemodeId = @gamemodeId
GO
/****** Object:  StoredProcedure [dbo].[updateGamemodeStatsGames]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateGamemodeStatsGames]
	@userId int,
	@gamemodeId int,
	@stat varchar(10)
AS
	UPDATE UserGamemodeStats
	SET gamesPlayed = gamesPlayed + 1, @stat = @stat + 1
	WHERE userId = @userId AND gamemodeId = @gamemodeId
GO
/****** Object:  StoredProcedure [dbo].[updateGlobalStatsGames]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateGlobalStatsGames]
	@id int,
	@stat varchar(10)
AS
	UPDATE UserGlobalStats
	SET gamesPlayed = gamesPlayed + 1, @stat = @stat + 1
	WHERE id = @id
GO
/****** Object:  StoredProcedure [dbo].[updateGlobalStatsHoursPlayed]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateGlobalStatsHoursPlayed]
	@id int
AS
	UPDATE UserGlobalStats
	SET hoursPlayed = hoursPlayed + 1
	WHERE id = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserDescription]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserDescription]
	@description varchar(600),
	@id int
AS
	UPDATE [User] SET description = @description WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserFriendCount]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserFriendCount]
	@friendCount int,
	@id int
AS
	UPDATE [User] SET friendCount = @friendCount WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserGlobalStats]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserGlobalStats]
	@value int,
	@stat varchar(30),
	@id int
AS
	UPDATE UserGlobalStats
	SET @stat = @value
	WHERE id = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserImageUrl]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserImageUrl]
	@imageUrl varchar(500),
	@id int
AS
	UPDATE [User] SET imageUrl = @imageUrl WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserLastConnected]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserLastConnected]
	@id int
AS
	UPDATE [User] SET lastConnected = GETDATE() WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserName]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserName]
	@name varchar(30),
	@id int
AS
	UPDATE [User] SET name = @name WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserRole]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserRole]
	@role char(1),
	@id int
AS
	UPDATE [User] SET role = @role WHERE userId = @id
GO
/****** Object:  StoredProcedure [dbo].[updateUserStatus]    Script Date: 26/8/2022 11:23:26 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[updateUserStatus]
	@id int,
	@status varchar(15)
AS
	UPDATE [User]
	SET status = @status
	WHERE userId = @id
GO
USE [master]
GO
ALTER DATABASE [JungleChess] SET  READ_WRITE 
GO
