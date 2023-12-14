using System.ComponentModel.DataAnnotations;

namespace botaniccoreajaxproject.Models
{
    public class Plants
    {
        [Key]
        public int PlantId { get; set; }
        public string PlantName { get; set; }
        public string PlantDescription { get; set;}
        public string PlantType { get; set;}
        public int PlantCount { get; set;}
        public string PlantOrigin { get; set;}

    }
}
