import { Component, OnInit, ViewChild } from "@angular/core";
import { FlashMessagesService } from "angular2-flash-messages";
import { ClientService } from "../../services/client.service";
import { Client } from "../../model/client";
import { Router } from "@angular/router";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-add-client",
  templateUrl: "./add-client.component.html",
  styleUrls: ["./add-client.component.css"]
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  disableBalanceOnAdd: boolean;

  @ViewChild("clientForm", { static: true }) form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private clientService: ClientService,
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (this.disableBalanceOnAdd) {
      value.balance = 0;
    }
    if (!valid) {
      this.flashMessage.show("Please fillout form correctly", {
        cssClass: "alert-danger",
        timeout: 5000
      });
    } else {
      //add client
      this.clientService.newClient(value);
      //show succes message
      this.flashMessage.show("New Client Added", {
        cssClass: "alert-success",
        timeout: 5000
      });
      // redirect to dashboard
      this.router.navigate(["/"]);
    }
  }
}
