SELECT [TaskId]
      ,[Title]
      ,[Descryption]
      ,[StatusId]
      ,[CarId]
      ,[TypeId]
      ,[Date]
FROM [dbo].[Task]
WHERE [TaskId] = @taskId