SELECT [TaskChatId]
      ,[MessageText]
      ,[MessageImage]
      ,[SendDate]
      ,[TaskId]
      ,[SenderId]
FROM [TechSupport].[dbo].[TaskChat]
WHERE [TaskChatId] = @chatId