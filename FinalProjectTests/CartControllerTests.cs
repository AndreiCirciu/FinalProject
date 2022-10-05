using AutoFixture;
using AutoFixture.Xunit2;
using Microsoft.EntityFrameworkCore;
using Moq;
using System.Linq;
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
    public class CartControllerTests
    {
        [Test, AutoData]
        public async Task GetCartByUserIdTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking).Options;
            var context = new DataContext(contextOptions);

            var cart = fixture.Build<Cart>()
                .With(x => x.ID, 1)
                .With(x => x.UserId, 1)
                .With(x => x.MedicineId, 1)
               // .With(x => x.Medicine.ID, 1)
                .With(x => x.Quantity, 2)
                .With(x => x.Price, 50).Create();

            var secondCart = fixture.Build<Cart>()
                .With(x => x.ID, 2)
                .With(x => x.UserId, 2)
                .With(x => x.MedicineId, 3)
               /* .With(x => x.Medicine.ID, 3)
                .With(x => x.Medicine.Name, "SecondMedicine")
                .With(x => x.Medicine.CompanyName, "SecondMedicineSRL")
                .With(x => x.Medicine.Price, 30)
                .With(x => x.Medicine.Quantity, 2)
                .With(x => x.Medicine.ImageUrl, "www")
                .With(x => x.Medicine.Uses, "somn")
                .With(x => x.Medicine.ExpirationDate, "26.09.2026")*/
                .With(x => x.Quantity, 2)
                .With(x => x.Price, 60).Create();


            //context.Carts.Add(cart);
            context.Carts.Add(secondCart);
            context.SaveChanges();

            var sut = new CartController(context);

            //ACT
            var response = await sut.GetCartByUserId(2);
            var result = (response.Result as dynamic).Value;

            //ASSERT
            Assert.AreEqual(result[0].Price, 60);
        }
        [Test, AutoData]
        public async Task RemoveFromCartTestAsync()
        {
            //ARRANGE
            var fixture = new Fixture();
            var contextOptions = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(Guid.NewGuid().ToString("N"), b => b.EnableNullChecks(false))
                .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
                .EnableSensitiveDataLogging().Options;
            var context = new DataContext(contextOptions);

            /*var cart1 = fixture.Build<Cart>()
                .With(x => x.UserId, 1)
                .With(x => x.MedicineId, 10)
                .With(x => x.Quantity, 1)
                .With(x => x.Price, 50).Create();
            context.Carts.Add(cart1);*/

            var cart2 = fixture.Build<Cart>()
                /*.With(x => x.ID, 206)
                .With(x => x.UserId, 4)
                .With(x => x.Price, 50)
                // .With(x => x.Medicine.ID, 1)
                .With(x => x.Quantity, 7)*/
                .With(x => x.MedicineId, 400).Create();
            
            context.Carts.Add(cart2);

            var medicine = fixture.Build<Medicine>()
                .With(x => x.Name, "Medicine 2")
                .With(x => x.Quantity, 999)
                .With(x => x.Price, 3)
                .With(x => x.ID, 400).Create();
            context.Medicines.Add(medicine);

            var user = fixture.Build<Account>()
                .With(x => x.ID, 206).Create();
            context.Medicines.Add(medicine);
            context.Accounts.Add(user);

            context.SaveChanges();

            var sut = new CartController(context);

            //ACT
            var response = await sut.RemoveFromCart(206, 206);

            //ASSERT
            var result = (response.Result as dynamic).Value;
            Assert.AreEqual(result.Id, 47);
            Assert.AreEqual(result.Quantity, 6);
        }
    }
    
}
