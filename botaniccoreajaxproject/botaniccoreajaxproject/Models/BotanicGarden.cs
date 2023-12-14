using System.ComponentModel.DataAnnotations;

namespace botaniccoreajaxproject.Models
{
    public class BotanicGarden
    {
        [Key]
        public int GardenId {  get; set; }
        public string GardenName { get; set;}
        public string Address { get; set;}
        public int Phone { get; set;}
        public string Email { get; set;}

    }
}
