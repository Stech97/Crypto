using System.ComponentModel.DataAnnotations;

namespace Crypto.ViewModels.Administrator
{
    public class AddNewsViewModel
    {
        [Required]
        public string Header { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public string Body { get; set; }
    }
}
