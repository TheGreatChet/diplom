SELECT [TaskId]
      ,[Title]
      ,[Descryption]
      ,[StatusId]
      ,[TypeId]
      ,[Date]
FROM [dbo].[Task]
WHERE [TaskId] = @taskId