import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { By } from '@angular/platform-browser';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Header,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
      ],
      providers: [MessageService],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open modal login by click on button', () => {
    const loginBtn = fixture.debugElement.query(
      By.css('.header-top__button-login'),
    );

    loginBtn.triggerEventHandler('click', {});
    expect(component.isLoginModalOpen).toBeTrue();

    // TODO не удалось проверить, действительно ли модалка появилась в DOM
    // fixture.detectChanges();
    // const modal = fixture.debugElement.query(By.css('.login-form'));
    // expect(modal).toBeTrue();
  });
  it('should open modal register by click on button', () => {
    const registerBtn = fixture.debugElement.query(
      By.css('.header-top__button-register'),
    );
    registerBtn.triggerEventHandler('click', {});
    expect(component.isRegisterModalOpen).toBeTrue();
  });

  it('auth button should contain label "Зарегистрироваться"', () => {
    const registerBtn = fixture.debugElement.query(
      By.css('.header-top__button-register'),
    );
    registerBtn.triggerEventHandler('click', {});
    const realBtn = registerBtn.nativeElement.querySelector('button');
    expect(realBtn.textContent).toBe('Зарегистрироваться');
  });

  it('login button should container label "Войти"', () => {
    const loginBtn = fixture.debugElement.query(
      By.css('.header-top__button-login'),
    );
    const realBtn = loginBtn.nativeElement.querySelector('button');
    expect(realBtn.textContent).toBe('Войти');
  });
});
