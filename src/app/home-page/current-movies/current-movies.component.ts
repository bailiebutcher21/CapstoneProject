import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/movieDB/movies.service';
import { MovieObj } from '../movieObj.interface';
import * as _ from 'lodash';
import { ImgService } from '../services/img.service';

@Component({
  selector: 'app-current-movies',
  templateUrl: './current-movies.component.html',
  styleUrls: ['./current-movies.component.scss']
})
export class CurrentMoviesComponent implements OnInit {

  imgUrls: string[];
  currentMovies: MovieObj[];

  constructor(
    private movieService: MovieService,
    private imgService: ImgService
  ) {
  }

  ngOnInit() {
    this.imgService.getImgUrls().then(urls => {
      this.imgUrls = urls;
    });
    this.movieService.getCurrentMovies().subscribe(movies => {
      this.currentMovies = this.movieService.mapMovie(movies, this.imgUrls);
    });
  }
}
