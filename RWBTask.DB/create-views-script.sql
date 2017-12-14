USE [RWBTask]
GO

/****** Object:  View [dbo].[vwEventInformation]    Script Date: 12/14/2017 8:06:00 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE VIEW [dbo].[vwEventInformation]
AS
SELECT        t1.Id, t1.Name, t1.StartTime, t2.Name AS LeagueName, t3.Name AS CategoryName, t1.LeagueId, t3.SportId, t2.CategoryId, t5.Name AS SportName
FROM            dbo.Event AS t1 INNER JOIN
                         dbo.League AS t2 ON t1.LeagueId = t2.Id INNER JOIN
                         dbo.Category AS t3 ON t2.CategoryId = t3.Id INNER JOIN
                         dbo.Sport AS t4 ON t3.SportId = t4.Id INNER JOIN
                         dbo.Sport AS t5 ON t3.SportId = t5.Id

GO


CREATE VIEW [dbo].[vwEventMarketLines]
AS
SELECT        dbo.Market.Id, dbo.Market.EventId, dbo.Market.Name AS MarketName, dbo.Market.IsLive, dbo.Line.Name AS LineName, dbo.Line.Price, dbo.Line.Id AS LineId
FROM            dbo.Market INNER JOIN
                         dbo.Line ON dbo.Market.Id = dbo.Line.MarketId

GO
