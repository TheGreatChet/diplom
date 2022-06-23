SELECT [EmplId]
      ,[Name]
      ,[Surname]
      ,[Patronymic]
      ,[AccountId]
FROM [dbo].[Employee]
WHERE [AccountId] = @accountId