import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GazService {
    constructor(public http: HttpClient) {}
    save(data): any {
        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const options = { headers: headers };
        return this.http.post('http://seventrade.ma/tamtam/ajout_client.php', data, options).pipe();
    }
}
