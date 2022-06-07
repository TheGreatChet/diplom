UPDATE [dbo].[Employee]
SET [Name] = @name,
    [Surname] = @surname,
    [Patronymic] = @patronymic
WHERE [AccountId] = @accountId