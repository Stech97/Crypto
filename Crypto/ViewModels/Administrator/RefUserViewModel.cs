using System.Collections.Generic;

namespace Crypto.ViewModels.Administrator
{
    public class RefUserViewModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public string RefLink { get; set; }
        public IEnumerable<RefUserViewModel> Children { get; set; }
    }
}
