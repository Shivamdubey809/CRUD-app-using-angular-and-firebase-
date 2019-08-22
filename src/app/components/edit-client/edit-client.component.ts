import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../../model/client";
import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "app-edit-client",
  templateUrl: "./edit-client.component.html",
  styleUrls: ["./edit-client.component.css"]
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    balance: 0
  };
  disableBalanceOnEdit: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    // get id from url
    this.id = this.route.snapshot.params["id"];
    // get client from observable
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }
  onSubmit({ value, valid }: { value: Client; valid: boolean }) {
    if (!valid) {
      this.flashMessage.show("please fill out form correctly", {
        cssClass: "alert-danger",
        timeout: 5000
      });
    } else {
      //Add id to client
      value.id = this.id;

      //update client
      this.clientService.updateClient(value);
      this.flashMessage.show("Client Updated", {
        cssClass: "alert-success",
        timeout: 5000
      });
      this.router.navigate(["/client/" + this.id]);
    }
  }
}
