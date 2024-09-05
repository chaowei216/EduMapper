using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DAL.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.ToTable("Roles");
            builder.HasData(
                new IdentityRole
                {
                    Id = "cac43a6e-f7bb-4448-baaf-1add431ccbbf",
                    Name = "STAFF",
                    NormalizedName = "STAFF"
                },
                new IdentityRole
                {
                    Id = "cbc43a8e-f7bb-4445-baaf-1add431ffbbf",
                    Name = "Administrator",
                    NormalizedName = "ADMINISTRATOR"
                },
                new IdentityRole
                {
                    Id = "d3c7a2e6-8c4b-4c1d-8c7f-a5c4d7a1e2b3",
                    Name = "Customer",
                    NormalizedName = "CUSTOMER"
                },
                new IdentityRole
                {
                    Id = "f1c2b8d3-2a5f-4f6e-b7e5-c68c7acb1e4a",
                    Name = "Teacher",
                    NormalizedName = "TEACHER"
                }

            );
        }
    }
}
