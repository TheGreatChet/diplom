SELECT [Task].[TaskId]
      ,[Title]
      ,[Descryption]
      ,[Car]
      ,[StatusId]
      ,[TypeId]
      ,[Date]
      ,[TaskList].[EmplId]
FROM [dbo].[Task]
INNER JOIN [TaskList] on TaskList.TaskId = [dbo].[Task].[TaskId]
WHERE [TaskList].ClientId = (SELECT Client.ClientId FROM Client WHERE AccountId= @clientId)