import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  constructor() { }

  public getUserData(uid) {
    throw new Error('getUserData() not implemented yet');
  }

  public addUser() {
    throw new Error('addUser() not implemented yet');
  }

  public addFriendToUser(userId, friendId) {
    throw new Error('addFriendToUser() not implemented yet');
  }

  public removeFriendFromUser(userId, friendId) {
    throw new Error('removeFriendFromUser() not implemented yet');
  }

  public addMovieToWishList(userId, movieId) {
    throw new Error('addMovieToWishList() not implemented yet');
  }

  public removeMovieFromWishList(userId, movieId) {
    throw new Error('removeMovieFromWishList() not implemented yet');
  }

}
