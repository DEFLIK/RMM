using System;

namespace Rmm.Domain.DAL.Entities
{
    public class Session : BaseEntity
    {
        public string Token { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}
