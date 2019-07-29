import {UnitTestsComponent} from './unit-tests.component';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TestsService} from './tests.service';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

describe('UnitTestsComponent', () => {

  let fixture: ComponentFixture<UnitTestsComponent>;
  let component: UnitTestsComponent;
  let service: TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitTestsComponent]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitTestsComponent);
    component = fixture.debugElement.componentInstance;
    service = fixture.debugElement.injector.get(TestsService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`should have title 'unit test component title' in h1 tag`, () => {
    fixture.detectChanges();
    const comp = fixture.debugElement.nativeElement;
    const title = comp.querySelector('h1').textContent;
    expect(title).toEqual('unit test component title');
  });

  it('should inject service', () => {
    fixture.detectChanges();
    expect(component.isVisible).toEqual(service.getIsVisible());
  });

  it('should display span if isVisible', () => {
    service.setIsVisible(true);
    fixture.detectChanges();
    const comp = fixture.debugElement.nativeElement;
    const text = comp.querySelector('span').textContent;
    expect(text).toEqual('Some text');
  });

  it('should hide span if !isVisible', () => {
    service.setIsVisible(false);
    fixture.detectChanges();
    const comp = fixture.debugElement.nativeElement;
    const text = comp.querySelector('span').textContent;
    expect(text).not.toEqual('Some text');
  });

  it('should have no text span if not sync', () => {
    spyOn(service, 'getSomeText')
      .and.returnValue(of('testText')
      .pipe(delay(100)));
    fixture.detectChanges();
    expect(component.words).toBe(undefined);
  });

  it('should have text if sync', async(() => {
    spyOn(service, 'getSomeText')
      .and.returnValue(of('testText')
      .pipe(delay(100)));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.words).toEqual('testText');
    });
  }));

});
