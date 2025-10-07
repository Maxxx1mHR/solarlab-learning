import { AdvertCommentResponseDto } from '../../../infrastructure/advert/dto/advert-comments.dto';

export interface CommentNode extends AdvertCommentResponseDto {
  replies: CommentNode[];
}
