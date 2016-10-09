import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

describe('App', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        // HttpModule, etc.
      ],
      providers: [
        // { provide: ServiceA, useClass: TestServiceA }
      ]
    });
  });

  it('should do something', async(() => {
    // Overrides here, if you need them
    TestBed.overrideComponent(AppComponent, {
      set: {
        template: '<div>Overridden template here</div>'
        // ...
      }
    });

    TestBed.compileComponents().then(() => {
      const fixture = TestBed.createComponent(AppComponent);

      // Access the dependency injected component instance
      // const app = fixture.componentInstance;

      expect('something').toBe('something');

      // Access the element
      const element = fixture.nativeElement;

      // Detect changes as necessary
      fixture.detectChanges();

      expect(element.textContent).toContain('something');
    });
  }));

});
