using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WorldCitiesAPI.Models
{
    [Table("Cities")]
    [Index(nameof(Name))]
    public class City
    {

        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = null!;

        [Column(TypeName = "decimal(7,4)")]
        public decimal Lat { get; set; }

        [Column(TypeName = "decimal(7,4)")]
        public decimal Lon { get; set; }

        /// <summary>   Country Id (foreign key)  </summary>
        [ForeignKey(nameof(Country))]
        public int CountryId { get; set; }
        public Country? Country { get; set; } = null!;
    }
}
