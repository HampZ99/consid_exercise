using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace consid_backend.Models
{
    public class LibraryItem
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Title { get; set; }
        public string Author { get; set; }
        public int? Pages { get; set; }
        public int? RunTimeMinutes { get; set; }
        public bool IsBorrowable { get; set; }
        public string Borrower { get; set; }
        public DateTime? BorrowDate { get; set; }
        public string Type { get; set; }
    }
}
