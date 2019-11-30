import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { NotificationService } from './services/notification/notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  readonly VAPID_PUBLIC_KEY = "BOZDvy80tL4MTo8EB3bSnswaNunGK4IsqpvSW5XnsrwzHVrPAQOKPnDentbyny5caBDCdflIXWiUZT-uwm-HHZM";

  title = 'foodRegistry';
  public isMobileResolution: boolean;
  public isSivenavOpen: boolean = false;

  constructor(
    private swPush: SwPush,
    private notificationService: NotificationService
  ) {
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }

  ngOnInit() {
    this.subscribeToNotifications();
  }

  sidenavToggle(): void {
    this.isSivenavOpen = !this.isSivenavOpen;
  }

  faCoffee = faCoffee;

  subscribeToNotifications() {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(sub)
        this.notificationService.addPushSubscriber(sub).subscribe(resp => {
          // this.sendNotifications();
        }
        )

      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  // sendNotifications(): void {
  //   this.notificationService.send().subscribe(data => {
  //     console.log(data);
  //   })
  // }
}
