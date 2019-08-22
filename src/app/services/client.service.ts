import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs";
import { Client } from "../model/client";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  constructor(private afs: AngularFirestore) {
    this.clientsCollection = this.afs.collection(
      "clients",
      ref => ref.orderBy("lastName", "asc") //asc is ascending reference is used for getting clients with lastname
    );
  }

  getClients(): Observable<Client[]> {
    //get clients with id and for that we have to use snapshot see documentation of angularfire2
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(changes =>
        changes.map(action => {
          const data = action.payload.doc.data() as Client;
          const id = action.payload.doc.id;
          return { id, ...data };
        })
      )
    );
    console.log("this.clients", this.clients);
    return this.clients;
  }

  newClient(client: Client) {
    this.clientsCollection.add(client);
    console.log(client);
  }

  getClient(id: string): Observable<Client> {
    this.clientDoc = this.afs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(action => {
        if (action.payload.exists === false) {
          return null;
        } else {
          const data = action.payload.data() as Client;
          data.id = action.payload.id;
          return data;
        }
      })
    );
    return this.client;
  }
  updateClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.afs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
