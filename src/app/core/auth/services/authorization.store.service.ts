import {computed, Injectable, Signal, signal} from '@angular/core';
import {AuthState} from '../domain/auth.state';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationStoreService {
  private state = signal<AuthState>({
    isLoading: false,
  });

  isLoading = computed(() => this.state().isLoading);
  
  setLoading(loading: boolean) {
    this.state.update(currentState => ({
      ...currentState,
      isLoading: loading
    }));
  }

}
