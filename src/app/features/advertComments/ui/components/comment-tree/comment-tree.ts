import { Component, inject, model, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

import { CommentNode } from '../../../../advertDetail/domain/advert.comments';
import { UserStoreService } from '../../../../../entities/users/user.store.service';
import { CommentService } from '../../../services/comment.service';
import { ActivatedRoute } from '@angular/router';
import { AdvertSelectedStoreService } from '@features';
import { AdvertDetailService } from '../../../../advertDetail/services/advert.detail.service';

@Component({
  selector: 'app-comment-tree',
  standalone: true,
  imports: [DatePipe, ReactiveFormsModule, InputText, Button],
  templateUrl: './comment-tree.html',
  styleUrl: './comment-tree.scss',
})
export class CommentTree {
  nodes = input<CommentNode[] | null>(null);
  answerTo = input('');

  activeEditId = model<string | null>(null);
  activeReplyId = model<string | null>(null);

  private readonly userStoreService = inject(UserStoreService);
  private readonly commentService = inject(CommentService);
  private readonly activatedRoute = inject(ActivatedRoute);
  advertSelectedStoreService = inject(AdvertSelectedStoreService);
  advertDetailService = inject(AdvertDetailService);

  public id = this.activatedRoute.snapshot.params['id'];

  editCommentForm: FormGroup;
  replyCommentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.editCommentForm = this.fb.group({
      editComment: new FormControl('', [Validators.required]),
    });
    this.replyCommentForm = this.fb.group({
      replyComment: new FormControl('', [Validators.required]),
    });
  }

  get currentUserId(): string | undefined {
    return this.userStoreService.user()?.userId;
  }

  startEdit(node: CommentNode) {
    this.editCommentForm.patchValue({ editComment: node.text });
    this.activeEditId.set(node.id);
  }
  cancelEdit() {
    this.activeEditId.set(null);
  }
  startReply(node: CommentNode) {
    this.replyCommentForm.reset({ replyComment: '' });
    this.activeReplyId.set(node.id);
  }
  cancelReply() {
    this.activeReplyId.set(null);
  }

  submitEditComment(nodeId: string) {
    const text = this.editCommentForm.get('editComment')?.value?.trim();
    if (!text) return;

    this.commentService.editComment(nodeId, text).subscribe({
      next: () => {
        const advertId =
          this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
        this.advertDetailService.getAdvertComments(advertId).subscribe();
      },
      complete: () => this.activeEditId.set(null),
    });
  }

  submitReplyComment() {
    const text = this.replyCommentForm.get('replyComment')?.value?.trim();
    const parentId = this.activeReplyId();
    if (!text || !parentId) return;

    const advertId =
      this.advertSelectedStoreService.advertSelected()?.id ?? this.id;

    this.advertDetailService
      .createAdvertComments(advertId, text, parentId)
      .subscribe({
        next: () =>
          this.advertDetailService.getAdvertComments(advertId).subscribe(),
        complete: () => this.activeReplyId.set(null),
      });
  }

  deleteComment(id: string) {
    this.commentService.deleteComment(id).subscribe({
      next: () => {
        const advertId =
          this.advertSelectedStoreService.advertSelected()?.id ?? this.id;
        this.advertDetailService.getAdvertComments(advertId).subscribe();
      },
    });
  }
}
