import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProuductParameterService {
  showImage: boolean;
  filterBy: string;

  constructor() { }
}
