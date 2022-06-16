SELECT [Task].[TaskId]
      ,[Title]
      ,[Descryption]
      ,[Car]
      ,[Task].[StatusId]
	  ,[Status].[Name] as 'StatusName'
      ,[Task].[TypeId]
	  ,[TaskType].[Name] as 'TypeName'
      ,[Date]
      ,[TaskList].[EmplId]
FROM [dbo].[Task]
INNER JOIN [TaskList] on TaskList.TaskId = [dbo].[Task].[TaskId]
INNER JOIN [Status] on [Status].StatusId = [Task].[StatusId]
INNER JOIN [TaskType] on [TaskType].TypeId = [Task].TypeId
WHERE [TaskList].EmplId = (SELECT Employee.EmplId FROM Employee WHERE AccountId = @emplId)