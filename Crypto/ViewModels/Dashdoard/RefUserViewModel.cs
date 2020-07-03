using System.Collections.Generic;

namespace Crypto.ViewModels.Dashdoard
{
    public class RefUserViewModel
    {
        public int Id { get; set; }
        public int? ParentId { get; set; }
        public IEnumerable<RefUserViewModel> Children { get; set; }
    }
}
