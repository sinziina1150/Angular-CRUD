import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'productname',
    'category',
    'date',
    'freshness',
    'price',
    'comment',
    'action'
  ];


  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public dialog: MatDialog, private api: ApiService) {}
  title = 'Angular-Employee';
  
  ngOnInit(): void {
    this.getAllProduct();
  }



  // ฟังชั่นสำรหับ เพิ่มข้อมูล
  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%',
    }).afterClosed().subscribe(val => {
      if(val === 'save'){
        this.getAllProduct()
      }
    });
  }


  //ฟั่งชั่นสำหรับ ลบข้อมูล
  deleteProduct(row:any){
    this.api.DeleteProduct(row.id).subscribe({
      next:(res)=>{
        alert("Delete Product SuccessFully")
        this.getAllProduct()
      },error:() => {
        alert("Error Delete Product Fail")
      }
    })
  }

  // ฟั่งชั่น สำหรับ ดึงข้อมูลมาแสดง
  getAllProduct() {
    this.api.getProduct().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
// ฟังชั่นสำหรับ ค้นหาข้อมูล
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  
// ฟังชั่นสำหรับ แก้ขไขข้อมูล
  editProduct(row:any) {
    this.dialog.open(DialogComponent,{
      width:"30%",
      data:row
    }).afterClosed().subscribe(val => {
      if(val === 'Update'){
        this.getAllProduct()
      }
    })
  }
}
