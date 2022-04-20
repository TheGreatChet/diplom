INSERT INTO [dbo].[Account] (
    [Login],
    [Password],
    [RoleId],
    [RegistrationDate],
    [Email],
    [ProfileImage]
)
VALUES (
    @login,
    @password,
    @roleId,
    CURRENT_TIMESTAMP,
    @email,
    @profileImage
)