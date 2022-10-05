using AutoFixture;
using AutoFixture.Xunit2;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using FinalProject;
using FinalProject.Controllers;
using FinalProject.Data;
using System;
using System.Threading.Tasks;
using FluentAssertions;
using FinalProject.Controllers.Services;

namespace FinalProjectTests
{
    public class AuthControllerTests
    {
        [Test, AutoData]
        public async Task LoginTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);
            var account = fixture.Build<User>()
                .With(x => x.ID, 1)
                .With(x => x.Username, "test").Create();

            context.Users.Add(account);
            context.SaveChanges();

            var usernameTokenManagerMock = fixture.Create<Mock<IUsernameTokenManager>>();
            usernameTokenManagerMock.Setup(x => x.CreateToken(It.IsAny<User>())).Returns("Token");
            usernameTokenManagerMock.Setup(x => x.VerifyPasswordHash(It.IsAny<string>(), It.IsAny<byte[]>(), It.IsAny<byte[]>())).Returns(true);

            var sut = new AuthController(context, usernameTokenManagerMock.Object);

            UserDto login = new()
            {
                UserName = "test",
                Password = "test"
            };
            //ACT
            var result = await sut.Login(login);
            //ASSERT
            result.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task RegisterTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<User>()
                .With(x => x.ID, 0)
                .With(x => x.Username, "test").Create();

            var userDto = fixture.Build<UserDto>().Create();

            context.Users.Add(account);
            context.SaveChanges();

            var usernameTokenManagerMock = fixture.Create<Mock<IUsernameTokenManager>>();
            usernameTokenManagerMock.Setup(x => x.CreatePasswordHash(It.IsAny<string>()))
                .Returns((fixture.Create<byte[]>(), fixture.Create<byte[]>()));
            usernameTokenManagerMock.Setup(x => x.VerifyUsername(It.IsAny<string>())).ReturnsAsync(true);

            var sut = new AuthController(context, usernameTokenManagerMock.Object);

            //ACT
            var result = await sut.Register(userDto);
            //ASSERT
            result.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetYesIfAdminTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<User>()
                .With(x => x.ID, 1)
                .With(x => x.Username, "test")
                .With(x => x.isAdmin, 1).Create();

            context.Users.Add(account);

            context.SaveChanges();

            var usernameTokenManagerMock = fixture.Create<Mock<IUsernameTokenManager>>();
            usernameTokenManagerMock.Setup(x => x.CreatePasswordHash(It.IsAny<string>()))
                .Returns((fixture.Create<byte[]>(), fixture.Create<byte[]>()));
            usernameTokenManagerMock.Setup(x => x.VerifyUsername(It.IsAny<string>())).ReturnsAsync(true);

            var sut = new AuthController(context, usernameTokenManagerMock.Object);

            //ACT
            var response = await sut.GetByUses("test");

            //ASSERT
            var result = (response.Result as dynamic).Value;
            var answer = "{\"isadmin\":1}";
            Assert.AreEqual(result, answer);
        }
        [Test, AutoData]
        public async Task GetNoIfAdminTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<User>()
                .With(x => x.ID, 1)
                .With(x => x.Username, "test")
                .With(x => x.isAdmin, 0).Create();

            context.Users.Add(account);

            context.SaveChanges();

            var usernameTokenManagerMock = fixture.Create<Mock<IUsernameTokenManager>>();
            usernameTokenManagerMock.Setup(x => x.CreatePasswordHash(It.IsAny<string>()))
                .Returns((fixture.Create<byte[]>(), fixture.Create<byte[]>()));
            usernameTokenManagerMock.Setup(x => x.VerifyUsername(It.IsAny<string>())).ReturnsAsync(true);

            var sut = new AuthController(context, usernameTokenManagerMock.Object);

            //ACT
            var response = await sut.GetByUses("test");

            //ASSERT
            var result = (response.Result as dynamic).Value;
            var answer = "{\"isadmin\":0}";
            Assert.AreEqual(result, answer);
        }

        [Test, AutoData]
        public async Task GetUserIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<User>()
                .With(x => x.ID, 3)
                .With(x => x.Username, "test")
                .With(x => x.isAdmin, 0).Create();

            context.Users.Add(account);

            context.SaveChanges();

            var usernameTokenManagerMock = fixture.Create<Mock<IUsernameTokenManager>>();
            usernameTokenManagerMock.Setup(x => x.CreatePasswordHash(It.IsAny<string>()))
                .Returns((fixture.Create<byte[]>(), fixture.Create<byte[]>()));
            usernameTokenManagerMock.Setup(x => x.VerifyUsername(It.IsAny<string>())).ReturnsAsync(true);

            var sut = new AuthController(context, usernameTokenManagerMock.Object);

            //ACT
            var response = await sut.GetId("test");

            //ASSERT
            var result = (response.Result as dynamic).Value;
            var answer = "{\"userid\":3}";
            Assert.AreEqual(result, answer);
        }


    }
}