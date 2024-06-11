import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Comment } from './entity/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

   @Post("create-comment")
  async createComment( @Body() comment:CommentDto):Promise<Comment>{
    return await this.commentService.createComment( comment)
  }
  @Delete("delete-comment/:commentId")
  async DelComment(@Param("commentId") commentId:number):Promise<any>{

    return await this.commentService.DelComment(commentId)
  }
}
