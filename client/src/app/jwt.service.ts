import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(username: String, password: String) {
    return this.httpClient.post('http://localhost:3000/login', {'username': username, 'password': password})
    .subscribe((res: any) =>{
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('id', res.id);
      this.router.navigate(['account']);
    },
    (error: any) =>{
      if(error.error.message == 'The user doesnt exist') 
        return alert('L\'utilisateur n\'existe pas. Vous pouvez le créer en appuyant sur \"S\'enregistrer\"');
      else if(error.error.message == 'The password is wrong')
        return alert('Le mot de passe est incorrect. Veuillez réessayer ou créer un nouveau compte.');
      else 
        return alert(error.error.message);
    });
  }

  register(username: String, password: String) {
    return this.httpClient.post('http://localhost:3000/register', {'username': username, 'password': password})
    .subscribe((res: any) =>{
        return alert('L\'utilisateur a été créé avec succès. Vous pouvez maintenant vous connecter.');    
     },
     (error: any) =>{
        if(error.error.message == 'The user already exists') 
          return alert('L\'utilisateur existe déjà. Veuillez choisir un autre nom.');
        else
          return alert(error.error.message);
     }); 
}
logout() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('id');
}

public loggedIn(): boolean {
  return localStorage.getItem('access_token') !==  null;
}

public getId(): String {
  return localStorage.getItem('id');
}



}
