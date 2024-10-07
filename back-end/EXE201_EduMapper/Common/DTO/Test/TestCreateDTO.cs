using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Test
{
    public class TestCreateDTO
    {
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public bool IsRequired { get; set; }
        public List<string>? ExamIds { get; set;} = null!;
    }
}
