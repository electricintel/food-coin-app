import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import {HttpModule} from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';
import { NativeStorage } from '@ionic-native/native-storage';
import { Shake } from '@ionic-native/shake';

import { MyApp } from './app.component';
import { PlaceholderPage } from '../pages/placeholder/placeholder';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AccountProvider } from '../providers/account/account';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PlaceholderPage,
    DashboardPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PlaceholderPage,
    DashboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Diagnostic,
    QRScanner,
    Vibration,
    NativeStorage,
    Shake,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider
  ]
})
export class AppModule {}
