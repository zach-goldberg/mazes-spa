import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maze-setup',
  templateUrl: './maze-setup.component.html',
  styleUrls: ['./maze-setup.component.css']
})
export class MazeSetupComponent implements OnInit {
  @ViewChild('width', { static: true }) width: ElementRef;
  @ViewChild('height', { static: true }) height: ElementRef;
  invalidInput = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onGenerateMaze() {
    this.invalidInput = !this.validInput();

    if (!this.invalidInput) {
      this.router.navigate(['maze'], {
        queryParams: {
          width: this.width.nativeElement.value,
          height: this.height.nativeElement.value
        }
      });
    }
  }

  private validInput(): boolean {
    const mazeWidth = this.width.nativeElement.value;
    const mazeHeight = this.height.nativeElement.value;
    if (!isNaN(mazeWidth) && !isNaN(mazeHeight)) {
      return Number.isInteger(+mazeWidth) && Number.isInteger(+mazeHeight) && +mazeWidth > 0 && +mazeHeight > 0
    } else {
      return false;
    }
  }

}
