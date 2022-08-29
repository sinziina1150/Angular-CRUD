import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  freshnessList = ['Brand new', 'Second Hand', 'Refurbished'];

  productForm!: FormGroup;
  Savebtn: string = 'Save';

  constructor(
    // นำเข้า services ต่างๆมาใช้ใน component
    private formbulider: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any
  ) {}
  ngOnInit(): void {
    // สร้างฟอมร์สำหรับกรอกข้อมูลนำเข้า
    this.productForm = this.formbulider.group({
      productname: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
      date: ['', Validators.required],
    });

    // สำหรับเช็คว่า ฟอมร์นั้นมีข้อมูลหรือไม่ ถ้ามีทำการเซ็ตข้อมูลที่ได้รับมาใส่ช่อง Input ที่กำหนด
    if (this.editData) {
      this.Savebtn = 'Update';
      this.productForm.controls['productname'].setValue(
        this.editData.productname
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['date'].setValue(this.editData.date);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['price'].setValue(this.editData.price);
    }
  }

  onSubmit() {
    // เช็คว่ามีข้อมูลหรือๆไม่ถัาไม่มีหรือทำการสร้างข้อมูลใหม่แต่ถ้ามีให้นำข้อมูลไปอัพเดท
    if (!this.editData) {
      // เช็คว่ามีการกรอกข้อมูลอยู่ไหม
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Adding Product SuccessFully');
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: () => {
            alert('Error Adding Product ');
          },
        });
      }
    } else {
      // สำหรับอัพเดทข้อมูล
      this.updateData();
    }
  }
  // ฟั่งชั่นหรับอัพเดทข้อมูล
  updateData() {
    this.api.EditProduct(this.editData.id, this.productForm.value).subscribe({
      next: (res) => {
        alert('Edit Product SuccessFully');
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('Edit Product Error Or Fail');
      },
    });
  }
}
