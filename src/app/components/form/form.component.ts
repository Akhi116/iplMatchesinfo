import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { IPLService } from '../../ipl.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  teams: string[] = [];
  seasons: string[] = [];
  selectedTeam: string = 'Select Team';
  selectedSeason: string = 'Select Season';

  @Output() formSubmit = new EventEmitter<{ team: string; season: string }>();

  constructor(private iplService: IPLService) {}

  onSubmit(): void {
    if (
      this.selectedTeam !== 'Select Team' &&
      this.selectedSeason !== 'Select Season'
    ) {
      this.formSubmit.emit({
        team: this.selectedTeam,
        season: this.selectedSeason,
      });

      // this.selectedTeam = 'Select Team';
      // this.selectedSeason = 'Select Season';
    } else {
      alert('Please select both team and season!');
    }
  }

  ngOnInit(): void {
    this.getTeam();
    this.getSeason();
  }

  getTeam(): void {
    this.iplService.getTeams().subscribe((teams) => (this.teams = teams));
  }

  getSeason(): void {
    this.iplService
      .getSeasons()
      .subscribe((seasons) => (this.seasons = seasons));
  }
}
