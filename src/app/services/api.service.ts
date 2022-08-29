import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  
  // API สำหรับ เพิ่มข้อมูลโดยต้องมี Parameter Data ใส่ด้วย
  postProduct(data: any) {
    console.log(data);
    return this.http.post<any>('http://localhost:3000/productList/', data);
  }

  // API สำหรับดึงข้อมูลทั้งหมด
  getProduct() {
    return this.http.get<any>('http://localhost:3000/productList');
  }
  // API สำหรับลบข้อมูลต้องมี Parameter ID ถึงจะลบข้อมูลได้
  DeleteProduct(id: number) {
    console.log(id);
    return this.http.delete('http://localhost:3000/productList/' + id);
  }

  EditProduct(id: number, body: any) {
    return this.http.put('http://localhost:3000/productList/' + id, body);
  }
}
