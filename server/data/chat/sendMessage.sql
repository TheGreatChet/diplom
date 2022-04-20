INSERT INTO [dbo].[TaskChat] (
      [MessageText],
      [MessageImage],
      [SendDate],
      [TaskId],
      [SenderId]
)
VALUES (
    @text,
    @image,
    CURRENT_TIMESTAMP,
    @taskId,
    @senderId
)
