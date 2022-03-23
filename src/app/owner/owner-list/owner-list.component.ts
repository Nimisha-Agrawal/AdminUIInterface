import { RepositoryService } from './../../services/repository.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Owner, CheckedStatusType } from '../../_interface/owner.model';
import { MatSort } from '@angular/material/sort';
import {
  MatPaginator,
  MatPaginatorDefaultOptions,
} from '@angular/material/paginator';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css'],
})
export class OwnerListComponent implements OnInit {
  public displayedColumns = [
    'selectedRow',
    'id',
    'name',
    'email',
    'role',
    'update',
    'delete',
  ];

  public dataSource = new MatTableDataSource<Owner>();
  
  @ViewChild(MatSort)
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  pageLength!: number;
  checkCount: any = 0;

  constructor(
    private repoService: RepositoryService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.pageLength = this.dataSource._pageData(this.dataSource.data).length;
  }
  public getAllOwners = () => {
    this.repoService.getData('').subscribe((res: any) => {
      this.dataSource.data = res as Owner[];
      for (let row of res) {
        row.selectedRow = false;
        row.editable = false;
      }
      this.pageLength = this.dataSource._pageData(this.dataSource.data).length;
    });
  };

  public redirectToDetails = (id: string) => {};

  public redirectToUpdate = (id: string) => {
    let index = this.dataSource.data.findIndex((item) => item.id == id);
    let element = this.dataSource.data.find((item) => item.id == id);
    element ? (element.editable = !element.editable) : null;
    if (element?.editable == true) {
      const previousState = Object.assign({}, element);
      previousState.editable = false;
      this.repoService.setPreviousData(previousState, element.id);
    } else {
      this.dataSource.data[index] = this.repoService.getPreviousData(
        element?.id
      );
    }
    this.dataSource._updateChangeSubscription();
  };

  public redirectToDelete = (id: string) => {
    const idx = this.dataSource.data.findIndex((item) => item.id == id);
    this.dataSource.data.splice(idx, 1);
    this.ngAfterViewInit();
  };

  public doFilter = (event: any) => {
    this.dataSource.filter = event?.target?.value?.trim().toLocaleLowerCase();
    this.checkCount = 0;
    this.dataSource.filteredData.forEach((item) => (item.selectedRow = false));
    this.dataSource.paginator = this.paginator;
  };

  public deleteSelected = () => {
    for (let row of this.dataSource._pageData(this.dataSource.data)) {
      //(_pageData(dataArray) functionality -> Returns a paged slice of the provided data array according to the provided MatPaginator's page index and length. If there is no paginator provided, returns the data array as provided. Hence provided length divides the whole data array into chunks and then provided pageIndex helps determine which chunk has to be picked up in order to return it as the desired pagedSlice of the provided data array.
      if (row.selectedRow) {
        this.redirectToDelete(row.id);
      }
    }
  };

  saveData(element: Owner) {
    element.editable = false;
  }

  topLeftCheckBoxChange(event?: any) {
    if (this.dataSource.filteredData.length > 0) {
      for (let row of this.dataSource.filteredData) {
        row.selectedRow = event?.target?.checked ? event.target.checked : false;
      }
    } else {
      this.pageLength = this.dataSource._pageData(this.dataSource.data).length;
      for (let row of this.dataSource._pageData(this.dataSource.data)) {
        //(_pageData(dataArray) functionality -> Returns a paged slice of the provided data array according to the provided MatPaginator's page index and length. If there is no paginator provided, returns the data array as provided. Hence provided length divides the whole data array into chunks and then provided pageIndex helps determine which chunk has to be picked up in order to return it as the desired pagedSlice of the provided data array.
        row.selectedRow = event?.target?.checked ? event.target.checked : false;
      }
    }
    if (event?.target?.checked) {
      this.checkCount =
        this.dataSource.filteredData.length > 0
          ? this.dataSource.filteredData.length
          : this.pageLength;
    } else {
      this.checkCount = 0;
    }
  }

  individualCheckBoxChange(event: any) {
    this.pageLength = this.dataSource._pageData(this.dataSource.data).length;
    if (event.target.checked) {
      this.checkCount++;
    } else {
      this.checkCount--;
    }
  }

  resetTopLeftCheckBox(event: any) {
    this.pageLength = event.pageSize;
    this.topLeftCheckBoxChange();
  }
}
