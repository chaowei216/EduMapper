using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Query
{
    public class TestParameters: QueryStringParameters
    {
        public string? UserId { get; set; }
        public string? Search { get; set; }
    }
}
