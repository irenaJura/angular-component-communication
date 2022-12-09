import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ProuductParameterService } from 'src/app/products/prouduct-parameter.service';

@Component({
  selector: 'pm-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.css']
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() displayDetail: boolean;
  @Input() hitCount: number;
  hitMessage: string;
  @ViewChild('filterElement') filterElementRef: ElementRef;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  get listFilter(): string {
    return this.parameterService.filterBy;
  }
  set listFilter(value: string) {
    this.parameterService.filterBy = value;
    this.valueChange.emit(value);
  }
  constructor(private parameterService: ProuductParameterService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.filterElementRef) this.filterElementRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hitCount'] && !changes['hitCount'].currentValue) {
      this.hitMessage = 'No matches found';
    } else {
      this.hitMessage = 'Hits: ' + this.hitCount;
    }
  }

}
