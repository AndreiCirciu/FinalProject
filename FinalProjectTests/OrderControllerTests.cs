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
using System.Collections.Generic;

namespace FinalProjectTests
{
    public class OrderControllerTests
    {
        [Test, AutoData]
        public async Task GetOrderByIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);
            var order = fixture.Build<Order>()
                .With(x => x.Id, 2)
                .With(x => x.userId, 3)
                .With(x => x.medicineNames, "3,4,5")
                .With(x => x.Price, 200)
                .With(x => x.Status, "Pending")
                .With(x => x.Time, DateTime.Today).Create();

            context.Orders.Add(order);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GetOrderByUserId(3);

            //ASSERT
            response.Should().NotBeNull();
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result[0].Id, 2);
            Assert.AreEqual(result[0].medicineNames, "3,4,5");
            Assert.AreEqual(result[0].Price, 200);
            Assert.AreEqual(result[0].Status, "Pending");
            Assert.AreEqual(result[0].Time, DateTime.Today);
        }

        [Test, AutoData]
        public async Task GerOrderByUserIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);
            var order = fixture.Build<Order>()
                .With(x => x.userId, 2).Create();
            context.Orders.Add(order);

            var cart = fixture.Build<Cart>()
                .With(x => x.UserId, 2)
                .With(x => x.MedicineId, 2)
                .With(x => x.Quantity, 2)
                .With(x => x.Price, 50).Create();
            context.Carts.Add(cart);

            var account = fixture.Build<Account>()
                .With(x => x.ID, 2)
                .With(x => x.FirstName, "Andrei")
                .With(x => x.LastName, "Circiu")
                .With(x => x.DateOfBirth, "25.05.1998")
                .With(x => x.Phone, "12345")
                .With(x => x.Address, "Bucuresti")
                .With(x => x.Funds, 1000)
                .With(x => x.IsAdmin, 0).Create();
            context.Accounts.Add(account);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 2)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GetOrderByUserId(2);

            //ASSERT
            response.Should().NotBeNull();
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result[0].Id, order.Id);
        }

        [Test, AutoData]
        public async Task GenerateReportSalesWeeklyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(true, false, "Weekly");

            //ASSERT
            response.Should().NotBeNull();        
        }

        [Test, AutoData]
        public async Task GenerateReportSalesMonthlyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(true, false, "Monthly");

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GenerateReportSalesYearlyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(true, false, "Yearly");

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GenerateReportStocksWeeklyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(false, true, "Weekly");

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GenerateReportStocksMonthlyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(false, true, "Montly");

            //ASSERT
            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task GenerateReportStocksYearlyTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var order = fixture.Build<Order>().Create();
            context.Orders.Add(order);

            var medicine = fixture.Build<Medicine>().Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new OrderController(context);

            //ACT
            var response = await sut.GenerateReports(false, true, "Yearly");

            //ASSERT
            response.Should().NotBeNull();
        }
    }    
}