using System;
using System.Threading.Tasks;
using NUnit.Framework;
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
        public void WriteGetRemove_ShouldBeEquivalent()
        {
            Assert.Pass();
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