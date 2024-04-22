import { Component } from '@angular/core';
import { ButtonComponent } from '../_shared/button/button.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonComponent, RouterModule],
  template: `
    <main>
      <section>
        <h1>home works!</h1>
      </section>
      <section>
        <nav>
          <app-button [routerLink]="['/todo/1']">Todo</app-button>
        </nav>
      </section>
    </main>
  `,
  styles: ``,
})
export class HomeComponent {}
