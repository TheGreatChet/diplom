SELECT [Task].[TaskId]
      ,[Title]
      ,[Descryption]
      ,[Car]
      ,[Task].[StatusId]
      ,[Status].[Name] as 'StatusName'
      ,[Task].[TypeId]
      ,[TaskType].[Name] as 'TypeName'
      ,[Date]
      ,(SELECT AccountId FROM [Employee] WHERE [Employee].[EmplId] = [TaskList].[EmplId]) as 'EmplId'
      ,(SELECT AccountId FROM [Client] WHERE [Client].[ClientId] = [TaskList].[ClientId]) as 'ClientId'
FROM [dbo].[Task]
INNER JOIN [TaskList] on TaskList.TaskId = [dbo].[Task].[TaskId]
INNER JOIN [Status] on [Status].StatusId = [Task].[StatusId]
INNER JOIN [TaskType] on [TaskType].TypeId = [Task].TypeId
WHERE [TaskList].ClientId = (SELECT Client.ClientId FROM Client WHERE AccountId= @clientId)