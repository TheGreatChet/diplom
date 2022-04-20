INSERT INTO [dbo].[Task] (
    [Title],
    [Descryption],
    [StatusId],
    [CarId],
    [TypeId],
    [Date]
)
VALUES (
    @title,
    @descrption,
    @statusId,
    @carId,
    @typeId,
    CURRENT_TIMESTAMP
)