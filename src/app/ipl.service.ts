import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Match } from './match.data';

@Injectable({
  providedIn: 'root',
})
export class IPLService {
  private baseUrl = 'https://iplmatches.azurewebsites.net/ipl';

  constructor(private http: HttpClient) {}

  getTeams(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/teams`);
  }

  getSeasons(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/seasons`);
  }

  getMatchesBySeasonAndTeam(team: string, season: string): Observable<Match[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/team/${team}/season/${season}`
    );
  }
}
