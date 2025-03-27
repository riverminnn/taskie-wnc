using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace taskie_wnc.Controllers;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
