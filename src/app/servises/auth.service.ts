import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private _currentUser: BehaviorSubject<boolean | User | any> = new BehaviorSubject(null);

  constructor(
    private router: Router,
    private supabaseService: SupabaseService
  ) {
    this.supabase = this.supabaseService.getClient();

    this.initializeUser();

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event ', event);
      console.log('session ', session);

      if (event === 'SIGNED_IN') {
        this._currentUser.next(session?.user);
      } else {
        this._currentUser.next(false);
        this.router.navigateByUrl('/login');
      }
    });
  }

  private async initializeUser() {
    const { data: user } = await this.supabase.auth.getUser();
    console.log('user ', user);

    if (user) {
      this._currentUser.next(user);
    } else {
      this._currentUser.next(false);
    }
  }

  signInWithEmail(email: string) {
    return this.supabase.auth.signInWithOtp({ email: email, options: {} });
  }

  logOut() {
    this.supabase.auth.signOut();
  }

  get currentUser() {
    return this._currentUser.asObservable();
  }
}
