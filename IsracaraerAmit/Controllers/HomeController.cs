using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using IsracaraerAmit.Models;
using System.Net.Http;
using Newtonsoft.Json;

namespace IsracaraerAmit.Controllers
{
    public class HomeController : Controller
    {
        public static List<RepositoryRoot> listOfRepository = new List<RepositoryRoot>();
        public static List<RepositoryItem> RepositoryListBookmark = new List<RepositoryItem>();

        public IActionResult Index()
        {
            if(RepositoryListBookmark != null)
            {
                ViewBag.Repositories = RepositoryListBookmark;
            }
            return View();
        }


        //serarch repository action
        public async Task<List<RepositoryRoot>> Search(string repositoryName)
        {
            listOfRepository.Clear();
            if (ModelState.IsValid) { 
             string URL = "https://api.github.com/search/repositories?q=" + repositoryName;
                using (HttpClient client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Add("User-Agent", "IsraPro");
                    try
                    {
                        var Message = await client.GetAsync(URL);
                        var Result = Message.Content.ReadAsStringAsync().Result;
                        RepositoryRoot obj = JsonConvert.DeserializeObject<RepositoryRoot>(Result);
                        listOfRepository.Add(obj);
                    }
                    catch (Exception)
                    {

                        throw;
                    }

                }
        }

            return listOfRepository;

        }


        public List<RepositoryItem> SessionManager(int id)
        {
            var currentRepo = from item in listOfRepository[0].Items
                              where item.Id == id
                              select item;
            foreach (var itemobj in currentRepo)
            {
                HttpContext.Session.SetObj("bookmarkSession", itemobj);
                var getObg = HttpContext.Session.GetObj<RepositoryItem>("bookmarkSession");
                RepositoryListBookmark.Add(getObg);
            }


            return RepositoryListBookmark;
        }


        public async Task<IActionResult> Clear()
        {
            RepositoryListBookmark.Clear();
            return RedirectToAction("Index");
        }

     
    }
}
