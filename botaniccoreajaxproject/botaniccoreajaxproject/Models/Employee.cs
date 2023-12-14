using System.ComponentModel.DataAnnotations;

namespace botaniccoreajaxproject.Models
{
    public class Employee
    {
        [Key]
        public int EmployeeId { get; set; }
        public string NameSurname { get; set; }
        public string Title { get; set; }
        public int Age { get; set; }
        public int Phone { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }



    }
}
