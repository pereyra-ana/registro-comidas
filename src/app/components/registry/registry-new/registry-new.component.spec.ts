import { ObserversModule } from '@angular/cdk/observers';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormField, MatHeaderRowDef, MatRowDef, MatSnackBarModule, MatTable } from '@angular/material';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RegistryListComponent } from '../registry-list/registry-list.component';
import { RegistryNewComponent } from './registry-new.component';


describe('RegistryNewComponent', () => {
  let component: RegistryNewComponent;
  let fixture: ComponentFixture<RegistryNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ObserversModule,
        AppRoutingModule,
        MatSnackBarModule
      ],
      declarations: [ 
        MatFormField,

        RegistryNewComponent,
        RegistryListComponent,
        MatTable,
        MatHeaderRowDef,
        MatRowDef
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistryNewComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
