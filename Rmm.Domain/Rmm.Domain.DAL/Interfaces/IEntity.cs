using System;

namespace Rmm.Domain.DAL.Interfaces
{
    public interface IEntity
    {
        public Guid Id { get; set; }
        public bool IsActive { get; set; }
    }
}
