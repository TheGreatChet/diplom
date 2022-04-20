SELECT [ClientId]
      ,[Name]
      ,[Surname]
      ,[Patronymic]
      ,[AccountId]
FROM [dbo].[Client]
WHERE [ClientId] = @clientId