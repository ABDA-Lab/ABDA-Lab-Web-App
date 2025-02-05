using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Features.Auth.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebApi.Common;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : ApiController
    {
        public AuthController(IMediator mediator) : base(mediator)
        {
        }

        //POST api/auth/register
        //Body
        //  {
        //    "username": "string",
        //    "password": "string",
        //  }
        [HttpPost("register")]
        public async Task<IActionResult> Create([FromBody] CreateIdentityCommand request, CancellationToken cancellationToken)
        {
            var result = await _mediator.Send(request, cancellationToken);
            return result.IsFailure ? HandleFailure(result) : Ok(new { statusCode = 200, message = "Register successfully", data = result });
        }

        //POST api/auth/login
        //Body
        //  {
        //    "username": "string",
        //    "password": "string",
        //  }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginCommand request, CancellationToken cancellationToken)
        {
            var command = new LoginCommand(request.Username, request.Password);
            var result = await _mediator.Send(command, cancellationToken);

            if (result.IsFailure)
                return HandleFailure(result);

            return Ok(result);
        }
    }
}