import { Component, OnInit } from '@angular/core';
import { extractHeaders } from 'src/app/my-functions/extractHeaders';
import { ApiService } from 'src/app/my-services/api.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-home-page',
  templateUrl: './user-home-page.component.html',
  styleUrls: ['./user-home-page.component.scss'],
})
export class UserHomePageComponent implements OnInit {
  constructor(private apiService: ApiService, private dialog: MatDialog) {}

  displayedColumns: string[] = [];
  getAllApiReponse: any[] = [];

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openDialogForAdd() {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%',
    });
  }

  getEmployeeList() {
    this.apiService.getUserList().subscribe({
      next: (response) => {
        console.log(response);
        this.getAllApiReponse = response;
        this.displayedColumns = extractHeaders(this.getAllApiReponse);
        console.log(this.displayedColumns);
      },
      error: () => {},
    });
  }

  editUser(element: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '40%',
      data: element,
    });
  }

  deleteUser(id: number) {
    this.apiService.deleteUser(id).subscribe(() => {
      console.log('Item deleted with id' + id);
      this.getEmployeeList();
    });
  }
}
