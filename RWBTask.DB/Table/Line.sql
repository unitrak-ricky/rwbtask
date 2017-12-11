CREATE TABLE [dbo].[Line]
(
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [MarketId] BIGINT NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    [Price] DECIMAL(9, 4) NOT NULL, 
    CONSTRAINT [FK_Line_Market] FOREIGN KEY ([MarketId]) REFERENCES [Market]([Id])
)

GO

CREATE INDEX [IX_Line_MarketId] ON [dbo].[Line] ([MarketId])
GO
