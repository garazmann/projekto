using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        //private readonly IStockRepository _stockRepo;
        //private readonly UserManager<AppUser> _userManager;
        //private readonly IFMPService _fmpService;
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
            //_stockRepo = stockRepo;
            //_userManager = userManager;
            //_fmpService = fmpService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()//([FromQuery] CommentQueryObject queryObject)
        {
            //if (!ModelState.IsValid)
                //return BadRequest(ModelState);

            var comments = await _commentRepo.GetAllAsync();

            var commentDto = comments.Select(s => s.ToCommentDto());

            return Ok(commentDto);
        }
        
    }
}