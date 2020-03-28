using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Logging;

namespace Code4Ro.CoViz19.Parser.Filters
{
    public class ModelInvalidStateLogger : IResultFilter, IOrderedFilter
    {
        private readonly ILogger _logger;
        public int Order => int.MinValue;

        public ModelInvalidStateLogger(ILogger<ModelInvalidStateLogger> logger)
        {
            _logger = logger;
        }

        public void OnResultExecuted(ResultExecutedContext context)
        {
            if (context.ModelState.IsValid) return;

            static string AllErrorMessages(ModelErrorCollection errors) =>
                string.Join(";", from item in errors select item.ErrorMessage);

            var t = string.Join(@"\n", from item in context.ModelState
                select item.Key + " " + AllErrorMessages(item.Value.Errors));

            _logger.LogError("[Model Validation Error]: {} for input {}", t, context.HttpContext.Items["JsonBody"]);
        }

        public void OnResultExecuting(ResultExecutingContext context)
        {
        }
    }
}