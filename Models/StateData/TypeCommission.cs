namespace Models
{
    public class TypeCommission
    {
        public int Level { get; set; }
        public double Value { get; set; }

        public override string ToString()
        {
            string Return;

            if (Level == 8)
                Return = "Super User";
            else
                Return = Level.ToString();

            return Return;
        }
    }
}
