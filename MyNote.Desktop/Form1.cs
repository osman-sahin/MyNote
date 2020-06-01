using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MyNote.Desktop.Models
{
    public partial class Form1 : Form
    {
        // https://www.tutorialsteacher.com/webapi/consuming-web-api-in-dotnet-using-httpclient
        // https://docs.microsoft.com/en-us/aspnet/web-api/overview/advanced/calling-a-web-api-from-a-net-client
        // https://stackoverflow.com/questions/37702013/webapi2-0-owin-token-request-using-json
        // https://stackoverflow.com/questions/29801195/adding-headers-when-using-httpclient-getasync/40707446#40707446

        HttpClient client = new HttpClient();

        private string ApiUrl => "https://noteapi.osahin.net/";
        private string UserName => txtUserName.Text;
        private string Password => txtPassword.Text;

        public Form1()
        {
            client.BaseAddress = new Uri(ApiUrl);
            InitializeComponent();
        }

        private async void btnListNotes_Click(object sender, EventArgs e)
        {
            string token = await GetTokenAsync();

            if (token == null)
            {
                lstNotes.DataSource = null;
                MessageBox.Show("Invalid Username or Password!");
                return;
            }

            List<Note> notes = await GetNotesAsync(token);
            lstNotes.DataSource = notes;
            lstNotes.DisplayMember = "Title";
        }

        private async Task<List<Note>> GetNotesAsync(string token)
        {
            using (var requestMessage = new HttpRequestMessage(HttpMethod.Get, "api/Notes/List"))
            {
                requestMessage.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var response = await client.SendAsync(requestMessage);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsAsync<List<Note>>();
                }
            }

            return null;
        }

        private async Task<string> GetTokenAsync()
        {
            var content = new FormUrlEncodedContent(new[]
            {
                    new KeyValuePair<string, string>("grant_type", "password"),
                    new KeyValuePair<string, string>("username", UserName),
                    new KeyValuePair<string, string>("password", Password)
            });

            HttpResponseMessage response = await client.PostAsync("Token", content);

            if (response.IsSuccessStatusCode)
            {
                IdentityToken identityToken = await response.Content.ReadAsAsync<IdentityToken>();
                return identityToken.AccessToken;
            }

            return null;
        }

        private void lstNotes_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (lstNotes.SelectedIndex > -1)
            {
                var note = lstNotes.SelectedItem as Note;
                txtNote.Text = note.Content;
            }
        }
    }
}
