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

    }
}
