using DBRepository.Interfaces;
using Models;
using System;
using System.IO;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Google.Apis.Gmail.v1;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Gmail.v1.Data;
using MimeKit;
using Microsoft.EntityFrameworkCore;

namespace DBRepository.Repositories
{
	public class EmailRepository : BaseRepository, IEmailRepository
	{
        private readonly GmailService service;
        public EmailRepository(string connectionString, IRepositoryContextFactory contextFactory) : base(connectionString, contextFactory) 
        {
            string[] Scopes = { GmailService.Scope.GmailSend };
            UserCredential credential;

            using (var stream = new FileStream("credentials.json", FileMode.Open, FileAccess.Read))
            {
                string credPath = "token";
                credential = GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets, Scopes, "user",
                    CancellationToken.None, new FileDataStore(credPath, true)).Result;
            }

            service = new GmailService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "Defima Email"
            });
        }

		public async Task AddEmail(EmailAddres email)
		{
            using var context = ContextFactory.CreateDbContext(ConnectionString);
            var Emails = await context.Emails.FirstOrDefaultAsync(e => e.Email == email.Email);
            if (Emails == null)
            {
                context.Emails.Add(email);
                SendEmail(email.Email);
            }
            await context.SaveChangesAsync();
        }

		private void SendEmail(string Email)
		{
            MimeMessage mail = new MimeMessage();

            mail.From.Add(new MailboxAddress("Support", "maksstech97@gmail.com"));
            mail.To.Add(new MailboxAddress("Test", Email));
            mail.Subject = "Test Message";
            mail.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = "We Will Launch Soon. <p>Thank you for your subscription."
            };

            var message = new Message
            {
                Raw = StringToBase64url(mail.ToString())
            };

            service.Users.Messages.Send(message, "me").Execute();

        }

        private static string StringToBase64url(string data)
        {
            return Convert.ToBase64String(Encoding.ASCII.GetBytes(data))
                .Replace('+', '-')
                .Replace('/', '_')
                .Replace("=", "");
        }
    }
}
