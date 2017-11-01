import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { HTTP } from '@ionic-native/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';
import { QRScanner } from '@ionic-native/qr-scanner';
import { Vibration } from '@ionic-native/vibration';
import { NativeStorage } from '@ionic-native/native-storage';
import { Shake } from '@ionic-native/shake';
import { TouchID } from '@ionic-native/touch-id';

import { MyApp } from './app.component';
import { PlaceholderPage } from '../pages/placeholder/placeholder';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RedeemPage } from '../pages/redeem/redeem';
import { DonatePage } from '../pages/donate/donate';

import { AccountProvider } from '../providers/account/account';
import { EathomelyProvider } from '../providers/eathomely/eathomely';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    PlaceholderPage,
    DashboardPage,
    RedeemPage,
    DonatePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    PlaceholderPage,
    DashboardPage,
    RedeemPage,
    DonatePage
  ],
  providers: [
    HTTP,
    StatusBar,
    SplashScreen,
    Diagnostic,
    QRScanner,
    Vibration,
    NativeStorage,
    Shake,
    TouchID,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccountProvider,
    EathomelyProvider
  ]
})
export class AppModule {}
