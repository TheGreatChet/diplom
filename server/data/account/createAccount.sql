INSERT INTO [dbo].[Account] (
    [Login],
    [Password],
    [RoleId],
    [RegistrationDate],
    [ProfileImage]
)
VALUES (
    @login,
    @password,
    @roleId,
    CURRENT_TIMESTAMP,
    @profileImage
)
SELECT max([AccountId]) as "AccountId" FROM [dbo].[Account]