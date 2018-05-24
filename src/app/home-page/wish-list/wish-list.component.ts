import { Component, OnInit, OnDestroy } from '@angular/core';
import { WishlistService } from '../services/wishlist.service';
import { MovieObj } from '../movieObj.interface';
import { Observable } from '@firebase/util';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit, OnDestroy {

  fakeMovie: MovieObj = {
    title: 'fake',
    description: 'fake',
    image: {
      url: 'fake',
      poster_ref: 'fake',
      description: 'fake'
    },
    public_rating: 5,
    app_rating: 5,
    fireId: 'fake'
  };
  wishlist: MovieObj[] = [];
  sub: Subscription;

  constructor(
    private wishlistService: WishlistService
  ) { }

  ngOnInit() {
    console.log(this.wishlistService.wishlistObservable);
    this.sub = this.wishlistService.wishlistObservable.subscribe(wishlist => {
      this.wishlist = wishlist;
    });
    this.wishlistService.addMovie(this.fakeMovie)
    .then((message) => {
      this.wishlistService.removeMovie(this.fakeMovie.fireId);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
