///<reference path="../../../../node_modules/rxjs/operators/catchError.d.ts"/>
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators/catchError';
import { map } from 'rxjs/operators/map';
import * as _ from 'lodash';

import { Movie } from './movies.interface';
import { Configuration } from './configuration.interface';


@Injectable()
export class MovieService {

  private movieUrl: string = 'https://api.themoviedb.org/3/movie/';
  private apiKey: string = 'f1dc689823def4f561ce96b21153f793';
  private Movies: string;
  private imageUrl: string = 'https://image.tmdb.org/t/p/w500';

  constructor(private httpClient: HttpClient) { }

  getUpcomingMovies(): Observable<Movie[]> {
    return this.httpClient
    // tslint:disable-next-line: no-any
      .get<any>(`${this.movieUrl}upcoming?api_key=${this.apiKey}`)
      .pipe(
        map(response => response.results),
        catchError(this.handleError));
  }
  getCurrentMovies(): Observable<Movie[]> {
    return this.httpClient
    // tslint:disable-next-line: no-any
      .get<any>(`${this.movieUrl}now_playing?api_key=${this.apiKey}`)
      .pipe(
        map(response => response.results),
        catchError(this.handleError));
  }
  getMovie(movieId: string): Observable<Movie> {
    return this.httpClient
      .get<Movie[]>(this.movieUrl)
      .pipe(
        map((movies: Movie[]) => movies.find(movie => movie.imdbID === movieId)),
        catchError(this.handleError)
    );
  }
  mapMovie(movies, imgUrls: string[]) {
    const returnMovies = _.chain(movies)
      .map((movie) => {
        return {
          title: movie.title,
          description: movie.overview,
          image: {
            url: imgUrls[(imgUrls.length - 1)] + movie.poster_path,
            poster_ref: movie.poster_path,
            description: `movie poster for ${movie.title}`
          },
          public_rating: movie.vote_average
        };
      }).value();
    return returnMovies;
  }

  getFullUrl(url) {
    return this.imageUrl + url;
  }

  handleError(error) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server Error');
  }
}
