SELECT [TaskId]
      ,[Title]
      ,[Descryption]
      ,[StatusId]
      ,[CarId]
      ,[TypeId]
      ,[Date]
FROM [dbo].[Task]
WHERE [Descryption] like @descryption