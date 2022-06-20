import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GameService } from './game.service';
import { Game } from './game';

const apiURL = 'http://localhost:3000/';
const mockGame = { id: 2, name: 'Metal Gear Solid 3', description: 'Box Technique Is The Best Technique' ,image: "", manufacturer: 'Capco', year: 2004 } as Game;
const mockGames: Game[] = [
  { id: 1, name: 'Metal Gear Solid 2', description: 'Box Technique Is The Best Technique' ,image: "", manufacturer: 'Capco', year: 1999 } as Game,
  { id: 2, name: 'Metal Gear Solid 3', description: 'Box Technique Is The Best Technique' ,image: "", manufacturer: 'Capco', year: 2004 } as Game
];

describe('GameService', () => {
  let service: GameService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GameService]
    });

    service = TestBed.inject(GameService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('getAll() should return an Observable<Game[]>', () => {
    service.getAll().subscribe(games => {
      expect(games).toEqual(mockGames);
    });

    const req = httpMock.expectOne('http://localhost:3000/games');
    expect(req.request.method).toBe('GET');
    req.flush(mockGames);
  });

  it('find() should return an Observable<Game>', () => {
    service.find(2).subscribe(game => {
      expect(game).toEqual(mockGame);
    });

    const req = httpMock.expectOne('http://localhost:3000/games/2');
    expect(req.request.method).toBe('GET');
    req.flush(mockGame);
  });

  it('create() should return an Observable<Game>', () => {
    service.update(mockGame.id,'10.0.0.127').subscribe(game => {
      expect(game).toEqual(mockGame);
    });

    const req = httpMock.expectOne('http://localhost:3000/games/' + mockGame.id + '/like');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockGame);
  });
});
