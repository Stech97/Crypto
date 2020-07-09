using System;
using System.Diagnostics;

namespace Crypto.ViewModels.Administrator
{
    public class ProfitViewModel
    {
        public double Percent { get; set; }
        public string Type { get; set; }

        public int ConvertType()
        {
            switch (Type)
            {
                case "Commission Small":
                    return 1;
                case "Commission Medium":
                    return 2;
                case "Commission Large":
                    return 3;
                default:
                    return 0;

            }
        }
    }
}
