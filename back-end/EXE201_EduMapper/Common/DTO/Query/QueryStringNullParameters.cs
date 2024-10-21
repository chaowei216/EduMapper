using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.DTO.Query
{
    public class QueryStringNullParameters
    {
        const int maxPageSize = 100;
        public int? PageNumber { get; set; }

        private int? _pageSize {  get; set; }
        public int? PageSize
        {
            get
            {
                return _pageSize;
            }
            set
            {
                _pageSize = value > maxPageSize ? maxPageSize : value;
            }
        }
    }
}
