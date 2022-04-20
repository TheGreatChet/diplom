UPDATE [dbo].[Account] 
SET [Login] = @login,
    [Password] = @password,
    [RoleId] = @roleId,
    [Email] = @email,
    [ProfileImage] = @profileImage
WHERE [AccountId] = @accountId
