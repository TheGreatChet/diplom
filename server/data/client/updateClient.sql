UPDATE [dbo].[Client]
SET [Name] = @name,
    [Surname] = @surname,
    [Patronymic] = @patronymic
WHERE [AccountId] = @accountId