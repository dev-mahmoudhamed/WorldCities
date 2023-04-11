using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WorldCitiesAPI.Models
{
    [Table("Countries")]
   
    public class Country
    {
        [Key]
        public int Id { get; set; } 
        public string Name { get; set; } = null!;
      
        [JsonPropertyName("iso2")]
        public string ISO2 { get; set; } = null!;
       
        [JsonPropertyName("iso3")]
        public string ISO3 { get; set; } = null!;
        public ICollection<City>? Cities { get; set; } = null!;

    }
}
