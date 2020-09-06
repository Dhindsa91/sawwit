using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace sawwit.Models {

    public class User {

        [DataType(DataType.Date)]
        public DateTime created { get; set; }

        [Key]
        [Required]
        public string email { get; set; }

        [Required]
        public string firstname { get; set; }

        [Required]
        public string lastname { get; set; }

        [Required]
        [Range(1, 100)]
        public string username { get; set; }

        [Required]
        [StringLength(100)]
        public string password { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public String token { get; set; }

        // public User(string email, string firstname, string lastname, string username, string password, int id, DateTime? created) {

        //     this.email = email;
        //     this.firstname = firstname;
        //     this.lastname = lastname;
        //     this.username = username;
        //     this.password = password;
        //     this.id = id;
        //     this.created = created ?? DateTime.Now;
        // }

    }

    public class UserDBContext : DbContext {

        public DbSet<User> users { get; set; }

        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options) { }

        // protected override void OnConfiguring (DbContextOptionsBuilder options) => options.UseNpgsql ("User ID = Arvind; Password=Jamesbond1!;Host=localhost;Port=5432;Database=sawwit;");

    }
}