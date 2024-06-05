import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { User } from 'src/app/components/user-table/user';

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];

const BIO: string = "Lorem ipsum dolor sit amet?"

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  displayedColumns: string[] = ['id', 'username', 'bio', 'img']; //TODO hide this in prod
  // displayedColumns: string[] = ['img', 'username', 'bio', 'buttons'];
  dataSource!: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Create test users
    const users = Array.from({ length: 55 }, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}

/** Builds and returns a new User. */
function createNewUser(id: number): User {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))];

  const bio = BIO;

  // Generate a link to a random image from Lorem Picsum
  // const randomImageLink = `https://picsum.photos/200/300?random=${Math.floor(Math.random() * 1000)}`;
  const randomImageLink = `https://picsum.photos/200/300?image=${id+500}`;
  

  return {
    id: id,
    username: name,
    bio: bio,
    img: randomImageLink,
  };
}