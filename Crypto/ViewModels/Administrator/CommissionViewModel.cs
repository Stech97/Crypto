namespace Crypto.ViewModels.Administrator
{
    public class CommissionViewModel
    {
        public double Persent { get; set; }
        public string Type { get; set; }

        public int ConvertType()
        {
            int returns = 0;

            if (!int.TryParse(Type, out returns))
                if (Type == "Super User")
                    returns = 8;

            return returns;
        }
    }
}
