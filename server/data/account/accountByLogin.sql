SELECT [AccountId]
      ,[Login]
      ,[Password]
      ,[RoleId]
      ,[RegistrationDate]
      ,[ProfileImage]
FROM [dbo].[Account]
WHERE [Login] = @login