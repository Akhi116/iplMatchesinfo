import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IPLService } from '../../ipl.service';
import { TableComponent } from './table.component';
import { HttpClientModule } from '@angular/common/http';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [TableComponent, HttpClientModule],
      providers: [IPLService],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
