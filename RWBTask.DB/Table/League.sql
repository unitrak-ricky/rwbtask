CREATE TABLE [dbo].[League]
(
    [Id] BIGINT NOT NULL PRIMARY KEY IDENTITY, 
    [CategoryId] BIGINT NOT NULL, 
    [Name] NVARCHAR(50) NOT NULL, 
    CONSTRAINT [FK_League_Category] FOREIGN KEY ([CategoryId]) REFERENCES [Category]([Id])
)

GO

CREATE INDEX [IX_League_CategoryId] ON [dbo].[League] ([CategoryId])
GO
