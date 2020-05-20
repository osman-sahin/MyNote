using MyNote.API.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MyNote.API.Controllers
{
    public class NotesController : BaseApiController
    {
        [HttpGet]
        public IQueryable<Note> List()
        {
            return db.Notes;
        }

        //public IHttpActionResult GetList()
        //{
        //    //db.Configuration.ProxyCreationEnabled = false;


        //    return Ok(db.Notes.Select(x => new NoteDTO { Baslik = x.Title, Yazar = x.Author }).ToList());  //author.email
        //}

        //public class NoteDTO
        //{
        //    public string Baslik { get; set; }
        //    public ApplicationUser Yazar { get; set; }   // string yazar
        //}
    }
}
