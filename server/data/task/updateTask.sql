UPDATE [dbo].[Task] 
SET [Title] = @title,
    [Descryption] = @descrption,
    [StatusId] = @statusId,
    [CarId] = @carId,
    [TypeId] = @typeId
WHERE [TaskId] = @taskId

