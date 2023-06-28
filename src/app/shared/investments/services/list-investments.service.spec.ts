import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { ListInvestmentsService } from './list-investments.service';
import { Investments } from '../model/investments';
import { MOCK_LIST } from './list-investments.mock';

describe('ListInvestmentsService', () => {
  let service: ListInvestmentsService;
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  const URL: string = 'https://raw.githubusercontent.com/troquatte/fake-server/main/investiments-all.json';

  const mockList: Array<Investments> = MOCK_LIST;
   
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule]
    });
    
    service = TestBed.inject(ListInvestmentsService);
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('(U) should be list all investments', (done) => {
    service.list().subscribe((res: Array<Investments>) => {
        expect(res[0].name).toEqual('Banco 1');
        expect(res[0].value).toEqual(100);
        expect(res[4].name).toEqual('Banco 5');
        expect(res[4].value).toEqual(100);
        done();
    }); 

    const req = httpTestingController.expectOne(URL);
    req.flush(mockList);

    expect(req.request.method).toEqual('GET');
  });
});
