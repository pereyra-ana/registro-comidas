import { ObserversModule } from '@angular/cdk/observers';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormField, MatHeaderRowDef, MatLabel, MatNavList, MatRowDef, MatSidenav, MatSidenavContainer, MatSidenavContent, MatTable, MatToolbar } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '../app-routing.module';
import { MainContentComponent } from '../main-content/main-content.component';
import { RegistryListComponent } from '../registry/registry-list/registry-list.component';
import { RegistryNewComponent } from '../registry/registry-new/registry-new.component';
import { MenuComponent } from './menu.component';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MatSidenav,
        MatToolbar,
        MatNavList,
        MatSidenavContent,
        MatSidenavContainer,
        MatTable,
        MatHeaderRowDef,
        MatRowDef,
        MatFormField,
        MatLabel,

        MenuComponent,
        RegistryListComponent,
        RegistryNewComponent,
        MainContentComponent
      ],
      imports: [
        AppRoutingModule,
        ObserversModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
