import { Component, Input, OnInit } from '@angular/core';
import { MazeCell } from '../../lib/maze-cell.model';

@Component({
  selector: 'app-maze-cell',
  templateUrl: './maze-cell.component.html',
  styleUrls: ['./maze-cell.component.css']
})
export class MazeCellComponent implements OnInit {
  @Input('data') cellData: MazeCell = {
    exploredType: 'unexplored',
    x: 0,
    y: 0
  }

  constructor() { }

  ngOnInit(): void {
  }

  getLeftOffset(): string {
    return `${this.cellData.x * 50}px`;
  }

  getTopOffset(): string {
    return `${this.cellData.y * 50}px`;
  }

}
