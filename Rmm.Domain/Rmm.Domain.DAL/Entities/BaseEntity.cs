using System;
using Rmm.Domain.DAL.Interfaces;

namespace Rmm.Domain.DAL.Entities
{
    public class BaseEntity : IEntity
    {
        public Guid Id { get; set; } = new Guid();
    }
}
