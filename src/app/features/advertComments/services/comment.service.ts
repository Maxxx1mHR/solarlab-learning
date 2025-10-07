import { inject, Injectable } from '@angular/core';
import { CommentApiService } from '../../../infrastructure/comment/services/comment.api.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentApiService = inject(CommentApiService);

  editComment(id: string, text: string) {
    return this.commentApiService.editComment(id, text);
  }

  deleteComment(id: string) {
    return this.commentApiService.deleteComment(id);
  }
}
