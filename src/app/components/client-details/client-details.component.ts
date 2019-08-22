import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../services/client.service";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { FlashMessagesService } from "angular2-flash-messages";
import { Client } from "../../model/client";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"]
})
export class ClientDetailsComponent implements OnInit {
  id: string;
  client: Client;
  hasBalance: boolean = true;
  showBalanceUpdateInput: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService,
    private flashMessage: FlashMessagesService
  ) {}

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params["id"];
    // get client from observable
    this.clientService.getClient(this.id).subscribe(client => {
      if (client != null) {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
      }
      this.client = client;
    });
  }
  updatedBalance(id: string) {
    this.clientService.updateClient(this.client);
    this.flashMessage.show("balance updated", {
      cssClass: "alert-success",
      timeout: 5000
    });
  }
  onDeleteClick(id: string) {
    if (confirm("are you sure?")) {
      this.clientService.deleteClient(this.client);
      this.flashMessage.show("delete client", {
        cssClass: "alert-danger",
        timeout: 5000
      });
      this.router.navigate(["/"]);
    }
  }
}
