INSERT INTO [dbo].[Task] (
    [Title],
    [Descryption],
    [StatusId],
    [Car],
    [TypeId],
    [Date]
)
VALUES (
    @title,
    @descryption,
    @statusId,
    @car,
    @typeId,
    CURRENT_TIMESTAMP
)

SELECT MAX(TaskId) as 'TaskId' FROM [Task]