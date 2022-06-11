SELECT a.ProfileImage, 
	   a.Login, 
	   r.Name,
	   tc.MessageText,
	   tc.MessageImage, 
	   tc.SendDate 
FROM TaskChat tc
INNER JOIN Account a on tc.SenderId = a.AccountId
INNER JOIN [Role] r on a.RoleId = r.RoleId
WHERE tc.TaskId = @taskId