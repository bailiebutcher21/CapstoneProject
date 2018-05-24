import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../core/movieDB/movies.service';
import { ImgService } from '../services/img.service';
import { MovieObj } from '../movieObj.interface';

@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.scss']
})
export class UpcomingComponent implements OnInit {

  imgUrls: string[];
  upcomingMovies: MovieObj;

  constructor(
    private movieService: MovieService,
    private imgService: ImgService
  ) { }

  ngOnInit() {
    this.imgService.getImgUrls().then(urls => {
      this.imgUrls = urls;
    });
    this.movieService.getUpcomingMovies().subscribe(movies => {
      this.upcomingMovies = this.movieService.mapMovie(movies, this.imgUrls);
    });
  }

}
