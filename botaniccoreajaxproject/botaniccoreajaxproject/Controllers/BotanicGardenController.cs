using botaniccoreajaxproject.Data;
using botaniccoreajaxproject.Models;
using Microsoft.AspNetCore.Mvc;

namespace botaniccoreajaxproject.Controllers
{
    public class BotanicGardenController : Controller
    {
        public readonly ApplicationDbContext context;
        public BotanicGardenController(ApplicationDbContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }
        public JsonResult BotanicGList()
        {
            var data = context.BotanicGardens.ToList();
            return new JsonResult(data);
        }
        public JsonResult AddBotanicG(BotanicGarden botanic)
        {
            var bot = new BotanicGarden()
            {
                GardenName = botanic.GardenName,
                Address = botanic.Address,
                Phone = botanic.Phone,
                Email = botanic.Email,
            };
            context.BotanicGardens.Add(bot);
            context.SaveChanges();
            return new JsonResult("Successful");

        }
        public JsonResult Edit(int id)
        {
            var data = context.BotanicGardens.Where(e => e.GardenId == id).SingleOrDefault();
            return new JsonResult(data);
        }
        [HttpPost]
        public JsonResult Update(BotanicGarden botanic)
        {
            context.BotanicGardens.Update(botanic);
            context.SaveChanges();
            return new JsonResult("Successful");
        }
        public JsonResult Delete(int id)
        {
            var data = context.BotanicGardens.Where(e => e.GardenId == id).SingleOrDefault();
            context.BotanicGardens.Remove(data);
            context.SaveChanges();
            return new JsonResult("Successfully deleted");
        }
    }
}
