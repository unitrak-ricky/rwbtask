CREATE TABLE [dbo].[Market]
(
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [EventId] BIGINT NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [IsLive] BIT NOT NULL, 
    CONSTRAINT [FK_Market_Event] FOREIGN KEY ([EventId]) REFERENCES [Event]([Id])
)

GO

CREATE INDEX [IX_Market_EventId] ON [dbo].[Market] ([EventId])
GO
