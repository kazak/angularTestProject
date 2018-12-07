import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
// Create this component if We develop new functionality for comments in future
export class CommentsComponent {

    @Input() task;
}
