UPDATE [dbo].[Employee]
SET [Name] = @name,
    [Surname] = @surname,
    [Patronymic] = @patronymic
WHERE [EmplId] = @emplId