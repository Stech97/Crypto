namespace Models
{
    public class MainPage
    {
        public int Id { get; set; }
        public string Component { get; set; }
        public string Header { get; set; }
        public string SubHeader { get; set; }
        public string Text { get; set; }
        public byte[] Image { get; set; }
        public string ImageName { get; set; }

        #region FAQ
        public string Question1Header { get; set; }
        public string Question2Header { get; set; }
        public string Question3Header { get; set; }
        public string Question1Text { get; set; }
        public string Question2Text { get; set; }
        public string Question3Text { get; set; }
        #endregion

        #region About Us
        public string Name1 { get; set; }
        public string Name2 { get; set; }
        public string Name3 { get; set; }

        public string Title1 { get; set; }
        public string Title2 { get; set; }
        public string Title3 { get; set; }

        public string Link1 { get; set; }
        public string Link2 { get; set; }
        public string Link3 { get; set; }

        public byte[] Picture1 { get; set; }
        public byte[] Picture2 { get; set; }
        public byte[] Picture3 { get; set; }

        public string Picture1Name { get; set; }
        public string Picture2Name { get; set; }
        public string Picture3Name { get; set; }

        #endregion

    }
}
