SELECT [AccountId]
      ,[Login]
      ,[Password]
      ,[RoleId]
      ,[RegistrationDate]
      ,[Email]
      ,[ProfileImage]
FROM [dbo].[Account]
WHERE [Login] = @login