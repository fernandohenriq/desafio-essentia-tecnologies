import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  template: ` <button>{{ title }}</button>`,
  styles: `
    button {
      padding: 10px;
      border-radius: 8px;
      border: solid 1px var(--primary-color);
      background: var(--primary-color);
      color: white;
      margin-top: 10px;
      margin-bottom: 10px;
      transition: 0.3s;
    }
    button:hover {
      background: white;
      color: var(--primary-color);
      cursor: pointer;
    }
  `,
})
export class ButtonComponent {
  @Input() title: string = 'Title';
}
