using Common.Enum.Center;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Common.DTO.Query
{
    public class CenterParameters: QueryStringParameters
    {
        public string? Search {  get; set; }

        [Column(TypeName = "nvarchar(24)")]
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LearningTypeEnum? LearningTypes { get; set; } 
    }
}
