SELECT [TaskId]
      ,[Title]
      ,[Descryption]
      ,[StatusId]
      ,[Car]
      ,[TypeId]
      ,[Date]
FROM [dbo].[Task]
WHERE [Descryption] LIKE '%' + @descryption + '%'