namespace Rmm.Domain.DAL.Entities
{
    public class User: BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Hash { get; set; }
    }
}
