using botaniccoreajaxproject.Data;
using botaniccoreajaxproject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace botaniccoreajaxproject.Controllers
{
    public class PlantsController : Controller
    {
        public readonly ApplicationDbContext context;

        public PlantsController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult PlantsList()
        {
            var data = context.Plants.ToList();
            return new JsonResult(data);
        }
        public JsonResult AddPlants(Plants plants)
        {
            var pla = new Plants()
            {
                PlantName = plants.PlantName,
                PlantDescription = plants.PlantDescription,
                PlantType = plants.PlantType,
                PlantCount = plants.PlantCount,
                PlantOrigin = plants.PlantOrigin,
            };
            context.Plants.Add(pla);
            context.SaveChanges();
            return new JsonResult("Successful");
        }
        public JsonResult Edit(int id)
        {
            var data = context.Plants.Where(e => e.PlantId == id).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult Update(Plants plants)
        {
            context.Plants.Update(plants);
            context.SaveChanges();
            return new JsonResult("Successful");
        }
        public JsonResult Delete(int id)
        {
            var data = context.Plants.Where(e => e.PlantId == id).SingleOrDefault();
            context.Plants.Remove(data);
            context.SaveChanges();
            return new JsonResult("Successfully deleted");
        }
    }
}
