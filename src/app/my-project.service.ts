import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
@Injectable()
export class MyProjectService {

  constructor(private http: Http) { }

  getAllData() {
  return this.http.get('https://api.myjson.com/bins/1glgyd')
        .map((res: Response) => res.json());
}

}
