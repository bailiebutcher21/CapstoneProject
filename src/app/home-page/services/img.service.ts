import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

import { Configuration } from '../../core/movieDB/configuration.interface';

@Injectable()
export class ImgService {

  private imageUrl: string = 'https://api.themoviedb.org/3/configuration?api_key=';
  private apiKey: string = 'f1dc689823def4f561ce96b21153f793';
  public imgUrls: string[];

  constructor(private httpClient: HttpClient) { }

  getConfiguration(): Observable<Configuration> {
    return this.httpClient
      .get<Configuration>(this.imageUrl + this.apiKey);
  }

  getImgUrls(): Promise<string[]> {
    return this.getConfiguration().toPromise().then(confData => {
      this.imgUrls = confData.images.poster_sizes.map(value => {
        return `${confData.images.base_url}${value}`;
      });
      return this.imgUrls;
    });
  }

}
