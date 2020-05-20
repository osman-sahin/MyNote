﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MyNote.API.Models
{
    public class Note
    {
        public int Id { get; set; }

        [Required]
        public string AuthorId { get; set; }
        [Required]
        [StringLength(100)]
        public string Title { get; set; }
        public string Content { get; set; }

        [Required]
        public DateTime? CreationTime { get; set; }
        [Required]
        public DateTime? ModificationTime { get; set; }

        [ForeignKey("AuthorId")]   //AuthorId'nin ustune de verebilirdik navigation prop'un adıyla ["Author"] olarak
        public virtual ApplicationUser Author { get; set; }
    }
}