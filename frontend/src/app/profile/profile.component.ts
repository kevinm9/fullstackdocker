import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service';
import { Persona } from '../models/persona.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser?: Persona | null;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
