CREATE TABLE [dbo].[Event]
(
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [LeagueId] BIGINT NOT NULL, 
    [Name] NVARCHAR(100) NOT NULL, 
    [StartTime] DATETIME2(2) NOT NULL, 
    CONSTRAINT [FK_Event_League] FOREIGN KEY ([LeagueId]) REFERENCES [League]([Id])
)

GO

CREATE INDEX [IX_Event_LeagueId] ON [dbo].[Event] ([LeagueId])
GO
