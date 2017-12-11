CREATE TABLE [dbo].[Category]
(
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [SportId] BIGINT NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    CONSTRAINT [FK_Category_Sport] FOREIGN KEY ([SportId]) REFERENCES [Sport]([Id])
)

GO

CREATE INDEX [IX_Category_SportId] ON [dbo].[Category] ([SportId])
GO
