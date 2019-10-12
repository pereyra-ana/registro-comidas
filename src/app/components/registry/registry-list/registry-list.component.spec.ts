import { ObserversModule } from '@angular/cdk/observers';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormField, MatHeaderRowDef, MatRowDef, MatTable } from '@angular/material';
import { RegistryListComponent } from './registry-list.component';


describe('RegistryListComponent', () => {
  let component: RegistryListComponent;
  let fixture: ComponentFixture<RegistryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ObserversModule,
      ],
      declarations: [ 
        MatTable,
        MatHeaderRowDef,
        MatFormField,
        MatRowDef,

        RegistryListComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
