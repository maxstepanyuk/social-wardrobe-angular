import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User, createClient } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);

  constructor(
    private router: Router
  ) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

    // // const user = this.supabase.auth.user();
    // const { data, error } = await this.supabase.auth.signInWithOtp({
    //   email: 'example@email.com',
    //   options: {
    //     emailRedirectTo: 'https://example.com/welcome'
    //   }
    // })
    const user = this.supabase.auth.getUser(); //todo - add the 'await' or is this ok? no - handle a promise

    console.log('user ', user)

    if (user) {
      this._currentUser.next(user);
    } else {
      this._currentUser.next(false);
    }

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event ', event);
      console.log('session ', session);

      if (event === 'SIGNED_IN') {
        this._currentUser.next(session?.user)
      } else {
        this._currentUser.next(false)
        this.router.navigateByUrl(
          '/login',
          // {replaceUrl: true}s
        )
      }
    })

  }

  signInWithEmail(email: string) {
    // used to be     return this.supabase.auth.signIn({email})
    return this.supabase.auth.signInWithOtp({ email: email, options: {} }); //TODO if this isnt ok
  }

  logOut() {
    this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}

// https://supabase.com/docs/reference/javascript/auth-api - Sign in a user through OTP
// https://www.youtube.com/watch?v=jmCiI_OSarA