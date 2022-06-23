INSERT INTO [dbo].[TaskList] (
      [TaskId]
      ,[EmplId]
      ,[ClientId]
)
VALUES (
    @taskId,
    @employeeId,
    (SELECT ClientId FROM [Client] WHERE [Client].AccountId = @clientId)
)