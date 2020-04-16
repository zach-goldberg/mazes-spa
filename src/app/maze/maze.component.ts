import { Component, Input, OnInit } from '@angular/core';
import { Maze } from '../lib/maze.model';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit {
  @Input() width;
  @Input() height;

  constructor() { }

  ngOnInit(): void {
  }

  get maze(): Maze {
    return new Maze(this.width, this.height);
  }

  getPixelWidth(): string {
    return `${this.width * 50}px`;
  }

  getPixelHeight(): string {
    return `${this.height * 50}px`;
  }

}
