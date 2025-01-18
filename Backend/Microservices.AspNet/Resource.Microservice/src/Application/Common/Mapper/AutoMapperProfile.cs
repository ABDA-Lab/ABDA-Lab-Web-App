using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3;
using Application.Features.Aws.Commands;
using AutoMapper;

namespace Application.Common.Mapper
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<GeneratePresignedUrlRequest, GeneratePresignedUrlCommand>()
                .ConstructUsing(src => new GeneratePresignedUrlCommand(
                    src.BucketName,
                    src.ObjectKey,
                    TimeSpan.FromMinutes(src.ExpiryDurationMinutes),
                    ParseHttpVerb(src.HttpVerb)
                ));
        }
        private static HttpVerb ParseHttpVerb(string httpVerb)
        {
            return Enum.TryParse(httpVerb, true, out HttpVerb parsedVerb) ? parsedVerb : HttpVerb.GET;
        }

    }
}