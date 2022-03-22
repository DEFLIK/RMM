using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Entities
{
    public class Session : BaseEntity
    {
        public string Token { get; set; }
        public DateTime ExpireAt { get; set; }
    }
}
