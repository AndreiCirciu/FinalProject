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

namespace FinalProjectTests
{
    public class AccountControllerTests
    {
        [Test, AutoData]
        public async Task AddAccountTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();

            context.Accounts.Add(account);

            var secondAccount = fixture.Build<Account>()
                .With(x => x.ID, 2)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "456789")
                .With(x => x.Address, "Timisoara")
                .With(x => x.Funds, 3000)
                .With(x => x.IsAdmin, 1).Create();


            context.SaveChanges();

            var sut = new AccountController(context);

            //ACT
            var response = await sut.AddAccount(secondAccount);

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetAllAccountsTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();

            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountController(context);

            //ACT
            var result = await sut.Get();

            //ASSERT
            result.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GetAccountByIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();

            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountController(context);

            //ACT
            var result = await sut.GetAccountById(1);
            //ASSERT
            result.Result.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task UpdateAccountTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();

            context.Accounts.Add(account);

            var editedAccount = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "456789")
                .With(x => x.Address, "Timisoara")
                .With(x => x.Funds, 3000)
                .With(x => x.IsAdmin, 1).Create();

            context.SaveChanges();

            var sut = new AccountController(context);

            //ACT
            var response = await sut.UpdateAccount(editedAccount);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.FirstName, "Andrei");
            Assert.AreEqual(result.LastName, "Circiu");
            Assert.AreEqual(result.DateOfBirth, "25.05.1998");
            Assert.AreEqual(result.Phone, "456789");
            Assert.AreEqual(result.Address, "Timisoara");
            Assert.AreEqual(result.Funds, 4000);
            Assert.AreEqual(result.IsAdmin, 1);
        }

        [Test, AutoData]
        public async Task DeleteByIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 1)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();
            context.Accounts.Add(account);
            context.SaveChanges();

            var sut = new AccountController(context);

            //ACT
            var result = await sut.Delete(1);
            //ASSERT
            result.Result.Should().NotBeNull();
        }
    }
}