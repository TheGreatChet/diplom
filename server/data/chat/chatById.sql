SELECT a.ProfileImage, 
	   a.Login, 
	   r.Name,
	   tc.MessageText,
	   tc.MessageImage, 
	   tc.SendDate,
	   t.StatusId
FROM TaskChat tc
INNER JOIN Account a on tc.SenderId = a.AccountId
INNER JOIN [Role] r on a.RoleId = r.RoleId
INNER JOIN [Task] t on t.TaskId = tc.TaskId
WHERE tc.TaskId = @taskId