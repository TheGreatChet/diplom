INSERT INTO [dbo].[Client] (
    [Name],
    [Surname],
    [Patronymic],
    [AccountId]
)
VALUES (
    @name,
    @surname,
    @patronymic,
    @accountId
)