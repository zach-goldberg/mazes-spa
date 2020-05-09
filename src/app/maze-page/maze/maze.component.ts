import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Maze } from '../../lib/maze.model';
import { ActivatedRoute, Params } from '@angular/router';
import { MazeCell } from '../../lib/maze-cell.model';

@Component({
  selector: 'app-maze',
  templateUrl: './maze.component.html',
  styleUrls: ['./maze.component.css']
})
export class MazeComponent implements OnInit, OnDestroy {
  width;
  height;
  maze: Maze;
  intervalTracker;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.width = +params['width'];
      this.height = +params['height'];
      this.maze = new Maze(this.width, this.height);
    });
  }

  getPixelWidth(): string {
    return `${this.width * 50}px`;
  }

  getPixelHeight(): string {
    return `${this.height * 50}px`;
  }

  solveDFS() {
    clearInterval(this.intervalTracker);
    this.maze.setAllUnexplored();
    const iterator = this.maze.getDFSIterator();
    this.intervalTracker = setInterval(() => {
      const next = iterator.getNext();
      if (next.done) {
        clearInterval(this.intervalTracker)
      } else {
        this.maze.setExplored(next.value);
      }
    }, 100);
  }

  solveBFS() {
    clearInterval(this.intervalTracker);
    this.maze.setAllUnexplored();
    const iterator = this.maze.getBFSIterator();
    this.intervalTracker = setInterval(() => {
      const next = iterator.getNext();
      if (next.done) {
        clearInterval(this.intervalTracker)
      } else {
        this.maze.setExplored(next.value);
      }
    }, 100);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalTracker);
  }

}
