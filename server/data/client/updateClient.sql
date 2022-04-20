UPDATE [dbo].[Client]
SET [Name] = @name,
    [Surname] = @surname,
    [Patronymic] = @patronymic
WHERE [ClientId] = @clientId