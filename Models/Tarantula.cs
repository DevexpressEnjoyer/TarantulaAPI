namespace TarantulaAPI.Models
{
    public class Tarantula
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Species { get; set; } = string.Empty;
        public bool HasStrongVenom { get; set; }
    }
}