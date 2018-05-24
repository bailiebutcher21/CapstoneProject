import { Component, OnInit, Input } from '@angular/core';
import { MovieObj } from '../movieObj.interface';
import { WishlistService } from '../services/wishlist.service';
import { MatSnackBar} from '@angular/material';
import { AuthService} from '../../core/auth.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  message: string = 'Added to your wishlist!';
  done: string = 'Done';
  @Input() movie: MovieObj;
  @Input() inWishlist: boolean;
  @Input() width: string;

  constructor(
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar,
    public authService: AuthService
  ) { }

  ngOnInit() {
  }
  addMovieToWishlist() {
    this.wishlistService.addMovie(this.movie)
    .then((message) => {
      this.openSnackBar(message, 'done');
    })
    .catch((error) => {
      this.openSnackBar(error, 'done');
    });
  }
  removeMovieFromWishlist() {
    this.wishlistService.removeMovie(this.movie.fireId);
  }
  openSnackBar(message: string, done: string) {
      this.snackBar.open(message, done, {
      duration: 2000
    });
  }
}
