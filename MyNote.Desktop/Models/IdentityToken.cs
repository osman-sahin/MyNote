using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyNote.Desktop.Models
{
    class IdentityToken
    {
        [JsonProperty(".expires")]
        public DateTime Expires { get; set; }
        [JsonProperty(".issued")]
        public DateTime Issued { get; set; }
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }
        [JsonProperty("expires_in")]
        public int ExpiresIn { get; set; }
        [JsonProperty("token_type")]
        public string TokenType { get; set; }
        [JsonProperty("userName")]
        public string UserName { get; set; }
    }
}
