using System;
using System.Threading.Tasks;
using dao_core;
using NUnit.Framework;
using web_core.Models;
using FluentAssertions;

namespace web_tests
{
    public class Tests
    {
        [SetUp]
        public void Setup()
        {
        }

        [Test]
        public async Task WriteGetRemove_ShouldBeEquivalent()
        {
            var dao = new Dao();
            var expected = new DeviceInfo()
            {
                Name = "pcname",
                Status = DeviceStatus.Disabled,
                Os = "shindows",
                Coordinates = new [] { 20.3, 50.2 },
                RunTimeS = 1200
            };
            int id;
            var actual = new DeviceInfo();

            //id = dao.WriteRecord<DeviceInfo, int>("public", "test", expected);
            actual.ApplyData(await dao.GetRecordAsync("DeviceInfo", "1"));

            actual.Should().BeEquivalentTo(expected);
        }

        [Test]
        public void WriteRemoveGet_ShouldReturnEmpty()
        {
            Assert.Pass();
        }

        [Test]
        public void GetEmpty_ShouldReturnEmpty()
        {
            Assert.Pass();
        }

        [Test]
        public void WrongParams_ShouldThrow()
        {
            Assert.Pass();
        }
    }
}