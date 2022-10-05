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
    public class MedicineControllerTests
    {

        [Test, AutoData]
        public async Task AddMedicineTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();

            context.Medicines.Add(medicine);

            var secondMedicine = fixture.Build<Medicine>()
                .With(x => x.ID, 2)
                .With(x => x.Name, "Second Medicine")
                .With(x => x.CompanyName, "Second MedicineSRL")
                .With(x => x.Price, 45)
                .With(x => x.Quantity, 8000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "oboseala")
                .With(x => x.ExpirationDate, "22.09.2026").Create();


            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.AddMedicine(secondMedicine);

            //ASSERT

            response.Should().NotBeNull();
        }

        [Test, AutoData]
        public async Task UpdateMedicineByUseTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();
            context.Medicines.Add(medicine);

            var editedMedicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "MedicineEdit")
                .With(x => x.CompanyName, "MedicineEditSRL")
                .With(x => x.Price, 30)
                .With(x => x.Quantity, 5200)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "oboseala")
                .With(x => x.ExpirationDate, "25.05.2028").Create();

            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.UpdateMedicine(editedMedicine);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Name, "MedicineEdit");
            Assert.AreEqual(result.CompanyName, "MedicineEditSRL");
            Assert.AreEqual(result.Price, 30);
            Assert.AreEqual(result.Quantity, 5200);
            Assert.AreEqual(result.ImageUrl, "www");
            Assert.AreEqual(result.Uses, "oboseala");
            Assert.AreEqual(result.ExpirationDate, "25.05.2028");

        }



        [Test, AutoData]
        public async Task GetAllMedicinesTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();

            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.GetAllMedicine();
            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result[0].Name, "Medicine");
            Assert.AreEqual(result[0].CompanyName, "MedicineSRL");
            Assert.AreEqual(result[0].Price, 25);
            Assert.AreEqual(result[0].Quantity, 5000);
            Assert.AreEqual(result[0].ImageUrl, "www");
            Assert.AreEqual(result[0].Uses, "durere");
            Assert.AreEqual(result[0].ExpirationDate, "25.05.2028");

        }

        [Test, AutoData]
        public async Task GetMedicineByUseTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();
            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.GetByUses("durere");

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result[0].Name, "Medicine");
            Assert.AreEqual(result[0].CompanyName, "MedicineSRL");
            Assert.AreEqual(result[0].Price, 25);
            Assert.AreEqual(result[0].Quantity, 5000);
            Assert.AreEqual(result[0].ImageUrl, "www");
            Assert.AreEqual(result[0].Uses, "durere");
            Assert.AreEqual(result[0].ExpirationDate, "25.05.2028");
        }

        [Test, AutoData]
        public async Task GetMedicineByIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();

            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.Get(1);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Name, "Medicine");
            Assert.AreEqual(result.CompanyName, "MedicineSRL");
            Assert.AreEqual(result.Price, 25);
            Assert.AreEqual(result.Quantity, 5000);
            Assert.AreEqual(result.ImageUrl, "www");
            Assert.AreEqual(result.Uses, "durere");
            Assert.AreEqual(result.ExpirationDate, "25.05.2028");
        }

        [Test, AutoData]
        public async Task DeleteMedicineByIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.ID, 1)
                .With(x => x.Name, "Medicine")
                .With(x => x.CompanyName, "MedicineSRL")
                .With(x => x.Price, 25)
                .With(x => x.Quantity, 5000)
                .With(x => x.ImageUrl, "www")
                .With(x => x.Uses, "durere")
                .With(x => x.ExpirationDate, "25.05.2028").Create();

            context.Medicines.Add(medicine);

            context.SaveChanges();

            var sut = new MedicineController(context);

            //ACT
            var response = await sut.Delete(1);

            //ASSERT
            response.Should().NotBeNull();
        }
    }
}