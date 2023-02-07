import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Branch } from '../model/branch';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private httpClient: HttpClient) { }
  branch!: Branch[];



  //this.httpClient.get(fetch.)
  /* getData = () => {
    Axios.arguments("http://localhost:8080/branch",
    {headers: {Authorization: 'Bearer 73Ntx3b6SwNXC7ANV3tw4wFfDdKntB26',
                "Access-Control-Allow-Origin": "*",
                mode: "cors",
    }}
    ).then((response: any) => {
        console.log(response)
    })
}*/

  // getBranchList(): Observable<Branch[]>{


  //   return this.httpClient.get<Branch[]>(this.baseURL);
  // }
  /*getBranchList() {
    return this.httpClient.get<any>('src/branch-list.JSON').toPromise() .then(res => <Branch[]>res.data)      .then(data => { return data; });    }*/
 // }

  createBranch(branch:Branch):Observable<any>{
    console.log(branch);
      return this.httpClient.post(`/api/branches`,branch);
   }


  getBranchList2(): Observable<Branch[]>{
    console.log("coming in service");
    return this.httpClient.get<Branch[]>(`/api/branches`);
  }

//   getBranchById(id:number):Observable<Branch>{
//     return this.httpClient.get<Branch>(`/api/branches/${id}`);
//   }


  updateBranch(id:number,branch: Branch):Observable<Object>{
    console.log(branch);
      return this.httpClient.put(`/api/branches/${id}/`,branch);
  }

//   deleteBranch(id:number):Observable<Object>{
//     return this.httpClient.delete(`${this.baseURL}/${id}`);
//   }

  deleteAllSelectedBranch(id:any):Observable<any> {
    console.log(id);
    return this.httpClient.delete(`/api/branches/${id}`);
  }
  // deleteAllSelectedBranch(id:String){
  //   console.log(id);
  // }
}
