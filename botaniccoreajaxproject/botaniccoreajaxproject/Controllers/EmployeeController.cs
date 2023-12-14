using botaniccoreajaxproject.Data;
using botaniccoreajaxproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace botaniccoreajaxproject.Controllers
{
    
    public class EmployeeController : Controller
    {
        public readonly ApplicationDbContext context;

        public EmployeeController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult EmployeeList()
        {
            var data = context.Employees.ToList();
            return new JsonResult(data);
        }
        public JsonResult AddEmployee(Employee employee)
        {
            var emp = new Employee()
            {
                NameSurname = employee.NameSurname,
                Title=employee.Title,
                Age=employee.Age,
                Phone = employee.Phone,
                Email = employee.Email,
                Address = employee.Address,
                
            };
            context.Employees.Add(emp);
            context.SaveChanges();
            return new JsonResult("Successful");
        }
        public JsonResult Edit(int id)
        {
            var data = context.Employees.Where(e => e.EmployeeId == id).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult Update(Employee employee)
        {
            context.Employees.Update(employee);
            context.SaveChanges();
            return new JsonResult("Successful");
        }
        public JsonResult Delete(int id)
        {
            var data = context.Employees.Where(e => e.EmployeeId == id).SingleOrDefault();
            context.Employees.Remove(data);
            context.SaveChanges();
            return new JsonResult("Successfully deleted");
        }
    }
}
