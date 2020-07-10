﻿namespace Models
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

    }
}
