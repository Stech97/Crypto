using System;

namespace Models
{
    public class News
    {
        public int Id { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public string Body { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime LastChangeDate { get; set; }
    }
}
