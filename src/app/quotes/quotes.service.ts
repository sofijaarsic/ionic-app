import { Injectable } from '@angular/core';
import { Quote } from './quote.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment';

interface QuoteData {
  author: string;
  text: string;
  imageUrl: string;
  userId: string;
}
@Injectable({
  providedIn: 'root',
})
export class QuotesService {
  //pocetna vrednost je prazan niz
  private _quotes = new BehaviorSubject<Quote[]>([]);

  //kad se pozove next metoda nad behaviour subjectom _quotes
  //gde god da ste pretplaceni na ovaj observable ce se okinuti next metoda
  //koju ste definisali u toj pretplati
  //npr. pozovete next metodu u addQuote metodi, u tap-u, sa najnovijom vrednoscu quotes
  //a na explore ste pretplaceni
  //okinuce se u explore next metoda
  get quotes(): Observable<Quote[]> {
    return this._quotes.asObservable();
  }
  constructor(private http: HttpClient, private authService: AuthService) {}

  addQuote(author: string, text: string) {
    let generatedId: string;
    const userId: string = this.authService.getUserId();
    return this.http
      .post<{ name: string }>(
        `${
          environment.firebaseRDBUrl
        }/quotes.json?auth=${this.authService.getToken()}`,
        {
          author,
          text,
          userId,
          imageUrl:
            'https://image.freepik.com/free-vector/carpe-diem-flowers_83277-1509.jpg',
        }
      )
      .pipe(
        switchMap((resData) => {
          generatedId = resData.name;
          return this.quotes;
        }),
        take(1),
        tap((quotes) => {
          this._quotes.next(
            quotes.concat({
              id: generatedId,
              author,
              text,
              userId,
              imageUrl:
                'https://image.freepik.com/free-vector/carpe-diem-flowers_83277-1509.jpg',
            })
          );
        })
      );
  }
  getQuotes() {
    return this.http
      .get<{ [key: string]: QuoteData }>(
        `${
          environment.firebaseRDBUrl
        }/quotes.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        map((quotesData: any) => {
          const quotes: Quote[] = [];
          for (const key in quotesData) {
            quotes.push({
              id: key,
              author: quotesData[key].author,
              text: quotesData[key].text,
              userId: quotesData[key].userId,
              imageUrl: quotesData[key].imageUrl,
            });
          }
          return quotes;
        }),
        tap((quotes) => {
          this._quotes.next(quotes);
        })
      );
  }
  getQuote(id: string) {
    return this.http
      .get<QuoteData>(
        `${
          environment.firebaseRDBUrl
        }/quotes/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        map((resData) => {
          return {
            id,
            author: resData.author,
            text: resData.text,
            userId: resData.userId,
            imageUrl: resData.imageUrl,
          };
        })
      );
  }

  //TODO korisnik moze da obrise samo svoj citat
  deleteQuote(id: string) {
    return this.http
      .delete(
        `${
          environment.firebaseRDBUrl
        }/quotes/${id}.json?auth=${this.authService.getToken()}`
      )
      .pipe(
        switchMap(() => {
          return this.quotes;
        }),
        take(1),
        tap((quotes) => {
          this._quotes.next(quotes.filter((q) => q.id !== id));
        })
      );
  }

  //TODO korisnik moze da izmeni samo svoj citat
  editQuote(
    id: string,
    author: string,
    text: string,
    imageUrl: string,
    userId: string
  ) {
    return this.http
      .put(
        `${
          environment.firebaseRDBUrl
        }/quotes/${id}.json?auth=${this.authService.getToken()}`,
        { author, text, imageUrl, userId }
      )
      .pipe(
        switchMap(() => this.quotes),
        take(1),
        tap((quotes) => {
          const updatedQuoteIndex = quotes.findIndex((q) => q.id === id);
          const updatedQuotes = [...quotes];
          updatedQuotes[updatedQuoteIndex] = {
            id,
            author,
            text,
            imageUrl,
            userId,
          };
          this._quotes.next(updatedQuotes);
        })
      );
  }
}
