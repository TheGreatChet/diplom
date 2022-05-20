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
    @descryption,
    @statusId,
    @carId,
    @typeId,
    CURRENT_TIMESTAMP
)