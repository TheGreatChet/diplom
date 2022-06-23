UPDATE [dbo].[Account] 
SET [Login] = @login,
    [Password] = @password,
    [RoleId] = @roleId,
    [ProfileImage] = @profileImage
WHERE [AccountId] = @accountId
